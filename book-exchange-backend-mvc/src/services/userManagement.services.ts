import { PrismaClient } from "@prisma/client";
import { CreateUserRequest } from "@src/types";
import * as userModel from "../models/users.services";
import * as userAddressModel from "../models/userAddress.services";
import * as userProfileModel from "../models/userProfilePictures.services";

export const registerUser = async (
  prisma: PrismaClient,
  data: CreateUserRequest,
  profileData: string
) => {
  return prisma.$transaction(async (transactionPrisma) => {
    const tempUser = await userModel.createUser(transactionPrisma, data);
    if (profileData) {
      const profile = await userProfileModel.createUserProfilePicture(
        transactionPrisma,
        { userId: tempUser.id, name: profileData, isActive: true }
      );
      const user = await userModel.updateUser(transactionPrisma, tempUser.id, {
        pictureId: profile.id,
      });
      return { user, profile };
    }
    return { tempUser };
  });
};

export const loginUser = async (prisma: PrismaClient, data: ) => {};

export const updateUserProfile = async () => {};

export const resetPassword = async () => {};
