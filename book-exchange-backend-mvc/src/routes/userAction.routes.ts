import { Router } from "express";

import * as userController from '../controllers/userAction.controller'

const router = Router()

router.post('/register', userController.registerUser);

export default router;