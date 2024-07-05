import { Router } from "express";
import * as controller from "./profile.controllers";
import { validateRequest } from "@src/middlewares/validateRequest";
import * as validate from "./profile.validate";
import { userUpload } from "@src/middlewares/upload";

const router = Router();
router.put("/picture/",userUpload.single("thumbnail"), controller.handleUpdatePicture);

router.get("/:userId", controller.handleGetUserInfo);

// Update User Profile
router.put("/:userId", controller.handleUpdateProfile);

// Update User Images


export default router;
