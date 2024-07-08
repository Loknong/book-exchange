import { Router } from "express";
import * as controller from "./transaction.controllers";

const router = Router();

router.get("/:transactionId", controller.handleGetTransacion)

export default router;
