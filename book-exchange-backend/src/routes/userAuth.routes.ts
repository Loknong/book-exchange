import {
  handleAuthenticate,
  handleForgotPassword,
  handleGetUserList,
  handleLogout,
  handleRegister,
  handleResendEmail,
  handleResetPassword,
  handleVerifyEmail,
} from "@src/controllers/userAuth.controller";
import { userUpload } from "@src/middlewares/upload";
import { Router } from "express";

const router = Router();

router.post("/signup",userUpload.single('thumbnail') ,handleRegister);
router.post("/login", handleAuthenticate);
router.post("/logout", handleLogout);
router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password", handleResetPassword);
router.post("/verify-email", handleVerifyEmail);
router.post("/resend-verification-email", handleResendEmail);
router.get("/list", handleGetUserList)

export default router;
