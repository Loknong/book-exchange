import { PrismaClient } from "@prisma/client";

import * as userModel from "../models/users.services";
import { CreateUserProfilePictureRequest, CreateUserRequest } from "@src/types";
import * as userProfileModel from "../models/userProfilePictures.services";

export const registerUser = async (
  prisma: PrismaClient,
  data: CreateUserRequest
) => {
  const user = await userModel.createUser(prisma, data);
  return user;
};

export const registerUserWithProfile = async (
  prisma: PrismaClient,
  userData: CreateUserRequest,
  profileData: string
) => {
  return prisma.$transaction(async (transactionPrisma) => {
    const tempUser = await userModel.createUser(transactionPrisma, userData);
    const profile = await userProfileModel.createUserProfilePicture(
      transactionPrisma,
      { userId: tempUser.id, name: profileData, isActive: true }
    );
    const user = await userModel.updateUser(transactionPrisma, tempUser.id, {
      pictureId: profile.id,
    });
    return { user, profile };
  });
};

export const getUserInfo = async (prisma: PrismaClient, id: number) => {
  const user = await userModel.getUserById(prisma, id);
  return user;
};
