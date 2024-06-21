import { PrismaClient } from "@prisma/client";
import {
  CreateUserProfilePictureRequest,
  UpdateUserProfilePictureRequest,
} from "@src/types";

import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";

export const createUserProfilePicture = async (
  prisma: PrismaTransactionClient,
  data: CreateUserProfilePictureRequest
) => {
  const userProfilePiture = await prisma.userProfilePictures.create({ data});
  return userProfilePiture;
};



export const getUserProfilePictureById = async (
  prisma: PrismaTransactionClient,
  id: number,
) => {
  const userProfilePicture = await prisma.userProfilePictures.findUnique({
    where: { id },
  });

  return userProfilePicture;
};

export const UpdateUserProfilePicture = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateUserProfilePictureRequest
) => {
  const userProfilePicture = await prisma.userProfilePictures.update({
    where: { id },
    data,
  });

  return userProfilePicture;
};

export const deleteUserProfilePicture = async (
  prisma: PrismaTransactionClient,
  id: number
) => {
  const userProfilePicture = await prisma.userProfilePictures.delete({
    where: { id },
  });

  return userProfilePicture;
};
