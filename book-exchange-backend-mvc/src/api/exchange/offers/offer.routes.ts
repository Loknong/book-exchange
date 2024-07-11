import { Router } from "express";
import * as controller from "./offer.controllers";

const router = Router();

// Create Offer
router.post("/", controller.handleCreateOffer)
// Update Offer
// router.put("/:offerId", controller.handleUpdateOffer)

// Get Offers
router.get("/:userId", controller.handleGetOffers)

export default router;