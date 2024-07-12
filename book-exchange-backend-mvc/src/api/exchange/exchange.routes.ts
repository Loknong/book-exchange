import { Router } from "express";
import { paymentEvidence } from "@src/middlewares/upload";
import * as controllers from "./exchange.controllers";
import offerRoutes from "./offers/offer.routes";
import transactionRoutes from "./transactions/transaction.routes";
import userTransactionRoutes from "./user-status/userTransactionStatus.routes";

const router = Router();

// chain services
router.put("/offers/:offerId", controllers.handleUpdateOffer);
router.put("/user-transactions/:transactionId/:userId", controllers.handleUpdateUserStatus)
// offers
router.use("/offers", offerRoutes);
// transcations
router.use("/transactions", transactionRoutes);

// user-transacion-status
router.use("/user-transactions", userTransactionRoutes);
// payments

// admin routes

// notifications routes

// tracking routes

export default router;
