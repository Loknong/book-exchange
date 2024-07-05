import { Router } from "express";
import * as controller from "./profile.controllers";

const router = Router();

router.get("/:userId", controller.handleRegisterTransaction);

// Update User Profile

// Update User Images


export default router;
