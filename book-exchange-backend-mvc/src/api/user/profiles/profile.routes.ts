import { Router } from "express";
import * as controller from "./profile.controllers";

const router = Router();
router.get("/:userId", controller.handleRegisterTransaction);

export default router;
