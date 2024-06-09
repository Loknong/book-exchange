import { Router } from "express";
import { bookUpload } from "@src/middlewares/upload";

const router = Router();
router.post('/add-book', bookUpload.single('thumbnail'), )







// const router = Router();

// // router.post('/',addBook);
// router.get('/',getBooks);

// router.post('/add', bookUpload.single('thumbnail'), handleAddBook);

// export default router;