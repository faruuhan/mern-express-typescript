import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateSchema = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ code: 400, message: errors.array({ onlyFirstError: true }) });
  next();
};

export const registerSchema = [
  body("fullName").exists({ checkFalsy: true }).withMessage("fullName is required"),
  body("email").exists({ checkFalsy: true }).withMessage("email is required").isEmail().withMessage("email invalid"),
  body("username").exists({ checkFalsy: true }).withMessage("username is required"),
  body("password").exists({ checkFalsy: true }).withMessage("password is required").isLength({ min: 8 }).withMessage("the password must be 8+ chars long and contain a number"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("confirm password does not match password");
    }
    return true;
  }),
];
