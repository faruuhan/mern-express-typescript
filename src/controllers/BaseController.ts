import { Response, Request } from "express";

export const BaseController = (req: Request, res: Response) => {
  res.send("Hellow Word");
};
