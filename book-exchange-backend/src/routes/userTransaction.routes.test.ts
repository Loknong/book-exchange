import {
  handleGetById,
  handleGetByTransactionId,
  handleInsertUserStatus,
  handleUpdateStatus,
} from "@src/controllers/userTransaction.controller.test";
import { Router } from "express";
const router = Router();

// use transactionId = 1, userId 5 or 6, status = "Up to you"
router.post("/", handleInsertUserStatus);

// use id = 1, status = ... 
router.put("/", handleUpdateStatus);

// use id = 1
router.get("/byId/:id", handleGetById);
router.get("/byTransId/:transactionId", handleGetByTransactionId);

export default router;
