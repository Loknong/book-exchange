import { handleAdminOfferList, handleGetOfferDetail, handleGetOfferHistory, handleMakeOffer, handleUpdateOfferStatus, handleViewPendingList } from "@src/controllers/offerManagement.controller";
import { Router } from "express";

const router = Router()

router.get("/admin", handleAdminOfferList)
router.post("/", handleMakeOffer)
router.get("/", handleViewPendingList)
router.get("/:offerId", handleGetOfferDetail)
router.put("/:offerId", handleUpdateOfferStatus)
router.get('/history/:userId', handleGetOfferHistory)

export default router;

// Mock Database -> then test routes