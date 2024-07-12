import { Router } from "express";
import * as controller from "./userTransactionStatus.controllers";

const router = Router();

// Get User Transaction Status
router.get("/", controller.handleGetUserTransactionStatus)

export default router;