import { Router } from "express";

import * as userController from '../controllers/userAction.controller'
import { userUpload } from "@src/middlewares/upload";

const router = Router()

router.post('/register', userController.registerUser);
router.post('/register-transaction',userUpload.single('thumbnail'), userController.handleRegisterTransaciton);
router.get('/info/:userId', userController.handleGetUserInfo)
export default router;