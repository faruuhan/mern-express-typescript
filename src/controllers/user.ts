import { Response, Request } from "express";
import usersModel from "./../models/users.model";
import { savefile } from "../config/savefile";
import fs from "fs-extra";

export const update = async (req: Request, res: Response) => {
  try {
    const user_id = req.user._id;
    const { fullName, email, username } = req.body;

    const data = {
      fullName,
      email,
      username,
      userImage: req.file ? "assets/" + req.file.filename + "." + req.file.mimetype.split("/")[1] : req.user.userImage,
    };

    const user = await usersModel.findByIdAndUpdate({ _id: user_id }, data, { new: true });

    if (req.file) {
      const imageType = req.file!.mimetype.split("/");
      if (imageType[0] !== "image") {
        await fs.remove("src/temp/" + req.file?.filename);
        return res.status(200).json({ code: 200, message: "failed update, file must image format such as jpeg, jpg, png" });
      }
      if (user) await savefile("assets", req.file?.filename + "." + imageType[1]);
      await fs.remove("assets/" + req.user.userImage.split("/")[1]);
    }

    return res.status(200).json({ code: 200, message: "update succesfully" });
  } catch (error: any) {
    if (error.code == 11000) await fs.remove("src/temp/" + req.file?.filename);
    return res.status(500).json({ code: 500, message: error.code == 11000 ? Object.keys(error.keyValue)[0] + " has been taken" : error.message });
  }
};
