import { Router } from "express";
import { handleAddBook, getBooks } from "@src/controllers/legacy/bookController";

import { bookUpload } from "@src/middlewares/upload";

const router = Router();

// router.post('/',addBook);
router.get('/',getBooks);

router.post('/add', bookUpload.single('thumbnail'), handleAddBook);

export default router;