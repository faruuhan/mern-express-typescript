import { Response, Request } from "express";
import usersModel from "./../models/users.model";
import bcrypt from "bcrypt";

interface bodyType {
  fullName: String;
  email: String;
  username: String;
  password: String;
}

export const Register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, username, password }: bodyType = req.body;

    const emailExist = await usersModel.findOne({ email });
    const usernameExist = await usersModel.findOne({ username });

    if (emailExist || usernameExist)
      return res.status(409).json({
        code: 409,
        message: emailExist ? "email has been registered" : "username already taken",
      });

    const passwordHash = await bcrypt.hash(password as string, 10);

    const users = await usersModel.create({
      fullName,
      email,
      username,
      password: passwordHash,
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
