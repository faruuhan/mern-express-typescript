import express from "express";
const upload = require("../config/multer");
const router = express();

import { Auth } from "../middleware/Authorization";

import { BaseController } from "../controllers/BaseController";

import { validation, schemaRegister, schemaLogin, schemaUpdateUser, schemaChangePassword } from "../middleware/validate";

import { Register, Login, Me } from "../controllers/auth";

import { updateUser, changePassword } from "../controllers/user";

router.get("/", BaseController);

// auth routes
router.post("/api/register", validation(schemaRegister), Register);
router.post("/api/login", validation(schemaLogin), Login);
router.get("/api/me", Auth, Me);

// user
router.put("/api/user/", Auth, upload.single("userImage"), validation(schemaUpdateUser), updateUser);
router.put("/api/user/password", Auth, validation(schemaChangePassword), changePassword);

export default router;
