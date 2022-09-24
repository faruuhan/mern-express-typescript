import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateSchema = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(404).json({ code: 404, message: errors.array() });
  next();
};

export const registerSchema = [body("fullName").exists({ checkFalsy: true }), body("email").isEmail(), body("password").exists({ checkFalsy: true }).isLength({ min: 8 })];
