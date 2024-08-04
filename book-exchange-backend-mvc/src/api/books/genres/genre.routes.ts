import { Router } from "express";
import * as controller from "./genre.controllers";
import { authMiddleware } from "@src/middlewares/authMiddleware";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", controller.handleGetGenres);
router.post(
  "/",
  authMiddleware([UserRole.ADMIN]),
  controller.handleCreateGenres
);
router.put("/:genreId", controller.handleUpdateGenre);
router.delete("/:genreId", controller.handleDeleteGenre);

export default router;
