import { Router } from "express";
import { userUpload } from "@src/middlewares/upload";
import * as authController from "./auth.controllers";
import { validateRequest } from "@src/middlewares/validateRequest";
import { createUserSchema, loginUserSchema, logoutUserSchema,userIdSchema, searchUserSchema } from './auth.validation';
const router = Router();

router.post(
  "/register",
  userUpload.single("thumbnail"),
  validateRequest(createUserSchema),
  authController.handleRegisterTransaction
);

router.post(
  "/login",
  validateRequest(loginUserSchema),
  authController.handleLoginUser
)

router.put("/logout", validateRequest(logoutUserSchema), authController.handleLogoutUser)
export default router