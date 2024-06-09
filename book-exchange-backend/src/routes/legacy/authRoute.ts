import { Router } from "express";
import { handleLogin } from "@src/controllers/legacy/authController";

const router = Router();

// router.post('/signup',signup);
// router.post('/login',login);
router.post('/login',handleLogin);

export default router;