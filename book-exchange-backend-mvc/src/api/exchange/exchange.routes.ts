import { Router } from "express";
import { paymentEvidence } from "@src/middlewares/upload";
import * as controllers from "./exchange.controllers"
import offerRoutes from "./offers/offer.routes"
import transactionRoutes from "./transactions/transaction.routes"

const router = Router();

// chain services
router.put("/offers/:offerId", controllers.handleUpdateOffer)


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
