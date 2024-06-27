import { Router } from "express";
import * as controller from "./address.controllers";
import { validateRequest } from "@src/middlewares/validateRequest";
import * as validate from "./address.validation";

const router = Router();

router.get('/list',
  validateRequest(validate.userAddressListSchema),
  controller.handleGetUserAddressList
)

router.post(
  "/",
  validateRequest(validate.createAddressSchema),
  controller.handleCreateAddress
);

router.delete(
  "/",
  validateRequest(validate.deleteAddressSchema),
  controller.handleDeleteAddress
);

router.put(
  "/",
  validateRequest(validate.updateUserAddressSchema),
  controller.handleUpdateAddress
);

export default router;
