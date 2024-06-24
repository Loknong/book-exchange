import { Router } from "express";
import { userUpload } from "@src/middlewares/upload";
import authRoutes from './auth/auth.routes'

const router = Router();

router.use('/auth',authRoutes)


export default router;