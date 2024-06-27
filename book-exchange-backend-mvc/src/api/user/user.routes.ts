import { Router } from "express";
import { userUpload } from "@src/middlewares/upload";
import authRoutes from "./auth/auth.routes";
import addressRoutes from "./addresses/address.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);

export default router;
