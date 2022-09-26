import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import usersModel from "./../models/users.model";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      code: 403,
      message: "A token is required for authentication",
    });
  }
  try {
    const bearer = token.split(" ");
    const bearerToken = bearer[1];
    const decoded: any = jwt.verify(bearerToken, process.env.TOKEN_KEY as string);
    const data = await usersModel.findOne({ _id: decoded.user_id });
    req.user = data;
  } catch (error: any) {
    return res.status(401).json({ code: 401, message: error.message });
  }
  return next();
};
