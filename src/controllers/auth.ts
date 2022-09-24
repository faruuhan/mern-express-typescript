import { Response, Request } from "express";
import usersModel from "./../models/users.model";
import bcrypt from "bcrypt";

interface bodyType {
  fullName: String;
  email: String;
  password: String;
  userImage: String;
}

export const Register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, userImage }: bodyType = req.body;

    const user = await usersModel.findOne({ email });

    if (user)
      return res.status(409).json({
        code: 409,
        message: "email has been registered",
      });

    const passwordHash = await bcrypt.hash(password as string, 10);

    const users = await usersModel.create({
      fullName,
      email,
      password: passwordHash,
      userImage,
      userStatus: "Active",
    });

    if (!users)
      return res.status(400).json({
        code: 400,
        message: "register unsuccessfuly",
      });

    return res.status(200).json({
      code: 200,
      message: "register successfuly",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};
