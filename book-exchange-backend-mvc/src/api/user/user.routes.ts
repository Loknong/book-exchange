import { Router } from "express";
import { userUpload } from "@src/middlewares/upload";
import authRoutes from "./auth/auth.routes";
import addressRoutes from "./addresses/address.routes";
import profileRoutes from "./profiles/profile.routes";
import { authMiddleware } from "@src/middlewares/authMiddleware";
import { UserRole } from "@prisma/client";

const router = Router();

router.use("/auth", authRoutes);
router.use("/address", authMiddleware([UserRole.USER]), addressRoutes);
router.use("/profile", authMiddleware([UserRole.USER]), profileRoutes);

export default router;
