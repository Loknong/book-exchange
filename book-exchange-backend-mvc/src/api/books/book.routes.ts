import { Router } from "express";
import genreRoutes from "./genres/genre.routes";
import userBookRoutes from "./userBook/userBook.routes";
import exploreRoutes from "./explore/explore.routes";
import { authMiddleware } from "@src/middlewares/authMiddleware";
import { UserRole } from "@prisma/client";

const router = Router();
// router.use(authMiddleware);

router.use("/genres", genreRoutes);
router.use("/user", authMiddleware([UserRole.USER, UserRole.ADMIN]), userBookRoutes);
router.use("/explore", exploreRoutes);

export default router;
