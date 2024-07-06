import { Router } from "express";
import * as controller from "./userBook.controllers";
import { bookUpload } from "@src/middlewares/upload";

const router = Router();

// Update Book Images
router.put(
  "/image",
  bookUpload.single("thumbnail"),
  controller.handleUpdateBookImage
);
// Create Book Images
router.post(
  "/",
  bookUpload.single("thumbnail"),
  controller.handleCreateUserBook
);

// Get Book
router.get("/:ownerId", controller.handleGetUserBooks);

// Delete Book
router.delete("/:bookId", controller.handleDeleteUserBook);

// Update Book Detail
router.put("/:bookId", controller.handleUpdateBookDetail);

export default router;
