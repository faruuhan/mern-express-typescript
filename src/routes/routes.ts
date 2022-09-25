import express from "express";
const router = express();
import { BaseController } from "../controllers/BaseController";

import { validateSchema, registerSchema, loginSchema } from "./../config/validate";

import { Register, Login, Me } from "../controllers/auth";

import { Auth } from "../middleware/Authorization";

router.get("/", BaseController);

// auth routes
router.post("/api/register", registerSchema, validateSchema, Register);
router.post("/api/login", loginSchema, validateSchema, Login);
router.get("/api/me", Auth, Me);

export default router;
