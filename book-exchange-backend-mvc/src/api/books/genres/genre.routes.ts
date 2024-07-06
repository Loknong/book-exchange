import { Router } from "express";
import * as controller from "./genre.controllers";

const router = Router();

router.get("/", controller.handleGetGenres)
router.post("/", controller.handleCreateGenres)
router.put("/:genreId", controller.handleUpdateGenre)
router.delete("/:genreId", controller.handleDeleteGenre)

export default router;