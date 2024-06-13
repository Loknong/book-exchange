import { Router } from "express";
import { handleCreateUser } from "@src/controllers/legacy/userController";

const router = Router();

router.post('/users',handleCreateUser);


export default router;