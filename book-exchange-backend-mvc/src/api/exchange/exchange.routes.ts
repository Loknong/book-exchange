import { Router } from "express";
import { paymentEvidence } from "@src/middlewares/upload";
import offerRoutes from "./offers/offer.routes"
import transactionRoutes from "./transactions/transaction.routes"

const router = Router();

// offers
router.use("/offers", offerRoutes)
// transcations
router.use("/transactions", transactionRoutes)


// user-transacion-status

// payments

// admin routes

// notifications routes

// tracking routes

export default router;
