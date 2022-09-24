import express from "express";
const router = express();
import { BaseController } from "../controllers/BaseController";

import { validateSchema, registerSchema } from "./../config/validate";

import { Register } from "../controllers/auth";

router.get("/", BaseController);

// auth routes
router.post("/api/register", registerSchema, validateSchema, Register);

export default router;
