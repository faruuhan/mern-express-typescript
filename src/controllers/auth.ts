import { Response, Request } from "express";
import usersModel from "./../models/users.model";
import bcrypt from "bcrypt";
import jwtController from "jsonwebtoken";

interface bodyType {
  fullName: string;
  email: string;
  username: string;
  password: string;
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

export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password }: bodyType = req.body;

    const user = await usersModel.findOne({ username }).select("password");

    if (user && (await bcrypt.compare(password, user.password as string))) {
      const token = jwtController.sign({ user_id: user._id, username }, process.env.TOKEN_KEY as string, {
        expiresIn: "120s",
      });
      return res.status(200).json({
        code: 200,
        token: token,
      });
    }
    return res.status(400).json({
      code: 400,
      message: "email or password wrong",
    });
  } catch (error: any) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const Me = async (req: Request, res: Response) => {
  try {
    const me = await usersModel.findOne({ _id: req.user.user_id });
    return res.status(200).json({ code: 200, message: me });
  } catch (error: any) {
    return res.status(400).json({ code: 400, message: error.message });
  }
};
