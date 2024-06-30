import { Router } from "express";
import { userUpload } from "@src/middlewares/upload";
import authRoutes from "./auth/auth.routes";
import addressRoutes from "./addresses/address.routes";
import profileRoutes from "./profiles/profile.routes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/profile", profileRoutes)

export default router;
