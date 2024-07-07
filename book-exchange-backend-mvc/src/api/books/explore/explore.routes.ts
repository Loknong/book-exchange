import { Router } from "express";
import * as controller from "./explore.controller";

const router = Router();

router.get("/", controller.handleGetBookListings);

export default router;