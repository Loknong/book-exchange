import { handleAdminOfferList } from "@src/controllers/offerManagement.controller";
import { Router } from "express";

const router = Router()

router.get("/admin", handleAdminOfferList)

export default router;

// Mock Database -> then test routes