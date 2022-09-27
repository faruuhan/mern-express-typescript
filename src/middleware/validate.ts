import * as yup from "yup";
import fs from "fs-extra";
import { Request, Response, NextFunction } from "express";

export const validation = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    await schema.validate(body);
    next();
  } catch (error: any) {
    if (req.file) {
      setInterval(() => {
        fs.remove("src/temp/" + req.file?.filename, (err) => {
          if (err) console.error(err);
        });
      }, 5000);
    }
    return res.status(400).json({ code: 400, error });
  }
};

export const schemaRegister = yup.object({
  fullName: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "confrim password does't match"),
});

export const schemaLogin = yup.object({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
});

export const schemaUpdateUser = yup.object({
  fullName: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
});
