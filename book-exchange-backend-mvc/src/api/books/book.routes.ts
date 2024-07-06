import { Router } from "express";
import genreRoutes from "./genres/genre.routes"
import userBookRoutes from "./userBook/userBook.routes"

const router = Router();

router.use("/genres", genreRoutes);
router.use("/user", userBookRoutes);


export default router;
