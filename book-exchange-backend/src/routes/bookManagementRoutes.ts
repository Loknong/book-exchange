import { handleAddGenre, handleAdminAddBook, handleAdminDeleteBook, handleAdminDeleteGenre, handleAdminUpdateBook, handleGetAllBook, handleGetBook, handleGetGenresList, handleUpdateGenre } from "@src/controllers/bookManagementController";
import { Router } from "express";
const router = Router();


router.get("/genre", handleGetGenresList);
router.post("/genre", handleAddGenre);
router.put("/genre/:genreId", handleUpdateGenre);
router.delete("/genre/:genreId", handleAdminDeleteGenre);


router.get("/", handleGetAllBook);
router.get("/:bookId", handleGetBook);
router.post("/add", handleAdminAddBook);
router.put("/:bookId", handleAdminUpdateBook);
router.delete("/:bookId", handleAdminDeleteBook);

export default router