import { Router } from "express";
import * as controller from "./userBook.controllers";

const router = Router();

router.get("/", controller.handleCreateUserBook)
router.get("/:ownerId", controller.handleGetUserBooks)
router.delete("/:bookId", controller.handleDeleteUserBook)

export default router;
