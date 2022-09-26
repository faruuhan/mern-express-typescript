import express from "express";
const upload = require("../config/multer");
const router = express();

import { Auth } from "../middleware/Authorization";

import { BaseController } from "../controllers/BaseController";

import { validateSchema, registerSchema, loginSchema } from "./../config/validate";

import { Register, Login, Me } from "../controllers/auth";

import { update } from "../controllers/user";

router.get("/", BaseController);

// auth routes
router.post("/api/register", registerSchema, validateSchema, Register);
router.post("/api/login", loginSchema, validateSchema, Login);
router.get("/api/me", Auth, Me);

router.put("/api/user/", upload.single("userImage"), Auth, update);

export default router;
