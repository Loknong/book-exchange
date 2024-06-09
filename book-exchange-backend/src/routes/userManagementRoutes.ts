import { Router } from "express";
import { bookUpload, userUpload } from "@src/middlewares/upload";
import { handleAddBook, handleGetInventory, handleGetProfile, handleUpdateBookStatus, handleUpdateProfile, handleUploadProfileImage } from "@src/controllers/userManagementController";

const router = Router();

router.get('/profile/:userId', handleGetProfile)
router.put('/profile/', handleUpdateProfile)
router.post('/add-book', bookUpload.single('thumbnail'), handleAddBook)
router.get('/inventory/:ownerId', handleGetInventory)
router.put('/manage-book/:bookId', handleUpdateBookStatus)
router.post('/profile-picture', userUpload.single('thumbnail'), handleUploadProfileImage)


// const router = Router();

// router.post('/',addBook);
// router.get('/',getBooks);

// router.post('/add', bookUpload.single('thumbnail'), handleAddBook);

export default router;