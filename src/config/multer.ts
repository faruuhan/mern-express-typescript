import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "src/temp");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    const formatFile = file.originalname.split(".");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + formatFile[1]);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
