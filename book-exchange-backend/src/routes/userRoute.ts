import { Router } from "express";
import { handleCreateUser } from "@src/controllers/userController";

const router = Router();

router.post('/users',handleCreateUser);


export default router;