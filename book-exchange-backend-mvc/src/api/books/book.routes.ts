import { Router } from "express";
import genreRoutes from "./genres/genre.routes"
import userBookRoutes from "./userBook/userBook.routes"
import exploreRoutes from "./explore/explore.routes"

const router = Router();

router.use("/genres", genreRoutes);
router.use("/user", userBookRoutes);
router.use("/explore", exploreRoutes)

export default router;
