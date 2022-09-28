import { Response, Request } from "express";
import usersModel from "./../models/users.model";
import { savefile } from "../config/savefile";
import bcrypt from "bcrypt";
import fs from "fs-extra";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user_id = req.user._id;
    const { fullName, email, username } = req.body;

    const data = {
      fullName,
      email,
      username,
      userImage: req.file ? "assets/" + req.file.filename + "." + req.file.mimetype.split("/")[1] : req.user.userImage,
    };

    if (req.file) {
      const imageType = req.file.mimetype.split("/");
      if (imageType[0] !== "image" || req.file.size > 1048576) {
        await fs.remove("src/temp/" + req.file?.filename);
        return res.status(200).json({ code: 200, message: imageType[0] !== "image" ? "failed update, file must image format such as jpeg, jpg, png" : "Size file can't more than 1024kb or 1mb" });
      }
    }

    const user = await usersModel.findByIdAndUpdate({ _id: user_id }, data, { new: true });

    if (user && req.file) {
      const imageType = req.file.mimetype.split("/");
      await savefile("assets", req.file?.filename + "." + imageType[1]);
      await fs.remove(req.user.userImage);
    }

    return res.status(200).json({ code: 200, message: "update succesfully" });
  } catch (error: any) {
    if (error.code == 11000) await fs.remove("src/temp/" + req.file?.filename);
    return res.status(500).json({ code: 500, message: error.code == 11000 ? Object.keys(error.keyValue)[0] + " has been taken" : error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const user_id = req.user._id;
    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password as string, 10);

    await usersModel.findByIdAndUpdate({ _id: user_id }, { password: passwordHash }, { new: true });

    return res.status(200).json({ code: 200, message: "update succesfully" });
  } catch (error: any) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
