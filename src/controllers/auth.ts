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

    const passwordHash = await bcrypt.hash(password as string, 10);

    await usersModel.create({
      fullName,
      email,
      username,
      password: passwordHash,
    });

    return res.status(200).json({
      code: 200,
      message: "register successfuly",
    });
  } catch (error: any) {
    return res.status(500).json({ code: 500, message: error.code == 11000 ? Object.keys(error.keyValue)[0] + " has been taken" : error.message });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password }: bodyType = req.body;

    const user = await usersModel.findOne({ username }).select("password");

    if (user && (await bcrypt.compare(password, user.password as string))) {
      const token = jwtController.sign({ user_id: user._id, username }, process.env.TOKEN_KEY as string, {
        expiresIn: "2h",
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
    return res.status(200).json({ code: 200, data: req.user });
  } catch (error: any) {
    return res.status(400).json({ code: 400, message: error.message });
  }
};
