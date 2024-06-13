import { handleCreateTransaction, handleGetTransaciton, handleUpdateTransaction } from "@src/controllers/transactions.controller.test";
import { Router } from "express";

const router = Router();

router.post("/",handleCreateTransaction);
router.put("/",handleUpdateTransaction);
router.get("/:transactionId", handleGetTransaciton)

export default router;