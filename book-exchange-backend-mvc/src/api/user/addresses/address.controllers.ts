import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as addressService from "./address.services";
import {
  CreateAddressRequest,
  CreateAddressRequestAuth,
  DeleteAddressRequest,
  DeleteAddressRequestAuth,
  GetUserAddressList,
  UpdateAddressRequest,
  UpdateAddressRequestAuth,
} from "./address.types";
import { ResponseHandler } from "@src/api/utils/ApiResponse";

// Insert
export const handleCreateAddress = async (
  req: Request<{}, {}, CreateAddressRequestAuth>,
  res: Response
) => {
  console.log("Create Add Req", req.body);
  const transformedData: CreateAddressRequest = {
    userId: req.body.userId,
    houseNumber: req.body.houseNumber,
    village: req.body.village,
    street: req.body.street,
    subdistrict: req.body.subdistrict,
    district: req.body.district,
    province: req.body.province,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    useThis: req.body.useThis,
  };
  try {
    // Check if the userId in the request body matches the user ID in the authenticated user
    if (req.body.userId !== req.body.user.id) {
      return res
        .status(400)
        .json(new ResponseHandler("error", "User ID mismatch."));
    }

    const address = await addressService.createUserAddress(
      prisma,
      transformedData
    );

    res
      .status(200)
      .json(
        new ResponseHandler(
          "success",
          "Create User Address successfully.",
          address
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};

// Delete
export const handleDeleteAddress = async (
  req: Request<{}, {}, DeleteAddressRequestAuth>,
  res: Response
) => {
  try {
    if (req.body.userId !== req.body.user.id) {
      const response = new ResponseHandler("error", "User ID mismatch.");
      return res.status(400).json(response);
    }
    const address = await addressService.deleteUserAddress(prisma, req.body);
    res
      .status(200)
      .json(new ResponseHandler("success", "Address deleted", address));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};

// Update
export const handleUpdateAddress = async (
  req: Request<{}, {}, UpdateAddressRequestAuth>,
  res: Response
) => {
  console.log("Update Add Req", req.body);

  try {
    if (req.body.userId !== req.body.user.id) {
      const response = new ResponseHandler("error", "User ID mismatch.");
      return res.status(400).json(response);
    }
    const address = await addressService.updateUserAddress(prisma, req.body);
    res
      .status(200)
      .json(new ResponseHandler("success", "Address updated", address));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};

// Get User Address List
export const handleGetUserAddressList = async (
  req: Request<{}, {}, GetUserAddressList>,
  res: Response
) => {
  try {
    const addressList = await addressService.getAddressList(prisma, req.body);
    res.status(200).json(new ResponseHandler("success", "Address list", addressList));
  } catch (error) {
    res
      .status(500)
      .json(new ResponseHandler("error", "Unexpected error occured", error));
  }
};
