import { Router } from "express";
import { register, login, getMe } from "./auth.controller.js";
import { registerValidation, loginValidation } from "./auth.validation.js";
import authenticate from "../../middleware/auth.js";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", authenticate, getMe);

export default router;