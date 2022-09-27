import { Response, Request } from "express";
import usersModel from "./../models/users.model";
import { savefile } from "../config/savefile";

export const update = async (req: Request, res: Response) => {
  try {
    const user_id = req.user._id;
    const { fullName, email, username } = req.body;

    const data = {
      fullName,
      email,
      username,
      userImage: req.file ? "assets/" + req.file.filename : req.user.userImage,
    };

    await usersModel.findByIdAndUpdate({ _id: user_id }, data, { new: true }).then(async () => {
      await savefile("assets", req.file?.filename);
    });

    return res.status(200).json({ code: 200, message: "update succesfully" });
  } catch (error: any) {
    return res.status(500).json({ code: 500, message: error.code == 11000 ? Object.keys(error.keyValue)[0] + " has been taken" : error.message });
  }
};
