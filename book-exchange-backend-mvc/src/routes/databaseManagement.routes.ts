import { Router } from "express";
import * as databaseController from "../controllers/databaseManagement.controller";

const router = Router();

router.post("/reset", databaseController.handleResetDatabase);
router.post("/mock");
router.post("/setup");

export default router;
