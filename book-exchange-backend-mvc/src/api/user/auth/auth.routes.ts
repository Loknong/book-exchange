import { Router } from "express";
import { userUpload } from "@src/middlewares/upload";
import * as authController from "./auth.controllers";
const router = Router();

router.post(
  "/register",
  userUpload.single("thumbnail"),
  authController.handleRegisterTransaction
);

export default router