import { Request, Response } from "express";
import prisma from "@src/utils/prismaClient";
import * as addressService from "./address.services";
import {
  CreateAddressRequest,
  DeleteAddressRequest,
  GetUserAddressList,
  UpdateAddressRequest,
} from "./address.types";

// Insert
export const handleCreateAddress = async (
  req: Request<{}, {}, CreateAddressRequest>,
  res: Response
) => {
  console.log("Create Add Req", req.body);

  try {
    const address = await addressService.createUserAddress(prisma, req.body);
    console.log(address);

    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// Delete
export const handleDeleteAddress = async (
  req: Request<{}, {}, DeleteAddressRequest>,
  res: Response
) => {
  console.log("Delete Add Req", req.body);

  try {
    const address = await addressService.deleteUserAddress(prisma, req.body);
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// Update
export const handleUpdateAddress = async (
  req: Request<{}, {}, UpdateAddressRequest>,
  res: Response
) => {
  console.log("Update Add Req", req.body);

  try {
    const address = await addressService.updateUserAddress(prisma, req.body);
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
};

// Get User Address List 
export const handleGetUserAddressList =  async (
  req: Request<{},{},GetUserAddressList>,
  res: Response
) => {

  try {
    const addressList = await addressService.getAddressList(prisma, req.body)
    res.status(200).json(addressList)
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "unexpected error occured.",
    });
  }
}