import { Router } from "express";
import { userGetInventory, userOfferBook } from "@src/controllers/userActionController";

const router = Router();

router.get("/inventory/:userId", userGetInventory);
router.post("/offers", userOfferBook);

export default router;
