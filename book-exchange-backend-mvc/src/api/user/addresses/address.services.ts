import { PrismaClient } from "@prisma/client";
import {
  CreateAddressRequest,
  DeleteAddressRequest,
  GetUserAddressList,
  UpdateAddressRequest,
} from "./address.types";

// Craete User Address
export const createUserAddress = async (
  prisma: PrismaClient,
  data: CreateAddressRequest
) => {
  return prisma.$transaction(async (prismaTransaction) => {
    const userAddressData = { ...data };
    delete userAddressData.useThis;

    const userAddress = await prismaTransaction.userAddress.create({
      data: userAddressData,
    });

    const tempUserInfo = await prismaTransaction.users.findUnique({
      where: { id: userAddress.userId },
    });

    console.log("tempUserInfo", tempUserInfo);

    if (tempUserInfo?.addressId === null || data.useThis === true) {
      console.log("Update User Address");

      await prismaTransaction.users.update({
        where: { id: tempUserInfo?.id },
        data: { addressId: userAddress.id },
      });
    }

    const userInfo = await prismaTransaction.users.findMany({
      where: { id: userAddress.userId },
    });
    return { addedAddress: userAddress, userInfo };
  });
};

// Update User Address
export const updateUserAddress = async (
  prisma: PrismaClient,
  data: UpdateAddressRequest
) => {
  const userAddress = await prisma.userAddress.update({
    where: { id: data.id },
    data: { ...data },
  });

  return { message: "Update user address successfully", data: userAddress };
};

// Delete User Address
export const deleteUserAddress = async (
  prisma: PrismaClient,
  data: DeleteAddressRequest
) => {
  const userAddress = await prisma.userAddress.delete({
    where: { id: data.id },
  });

  return { message: "delete user address successfully", data: userAddress };
};

// Get Partial User Address List
export const getAddressList = async (
  prisma: PrismaClient,
  data: GetUserAddressList
) => {
  const selectField =
    data.addressMode === "Partial"
      ? { id: true, houseNumber: true, district: true, province: true }
      : undefined;

  const userAddressList = await prisma.userAddress.findMany({
    where: { userId: data.userId },
    select: selectField,
  });

  console.log(userAddressList);

  return { message: "User Address List", data: userAddressList };
};
