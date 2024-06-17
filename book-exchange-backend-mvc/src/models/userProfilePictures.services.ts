import { PrismaClient } from "@prisma/client";
import {
  CreateUserProfilePictureRequest,
  UpdateUserProfilePictureRequest,
} from "@src/types";

export const createUserProfilePicture = async (
  prisma: PrismaClient,
  data: CreateUserProfilePictureRequest
) => {
  const userProfilePiture = await prisma.userProfilePictures.create({ data });
  return userProfilePiture;
};

export const getUserProfilePictureById = async (
  prisma: PrismaClient,
  id: number
) => {
  const userProfilePicture = await prisma.userProfilePictures.findUnique({
    where: { id },
  });

  return userProfilePicture;
};

export const UpdateUserProfilePicture = async (
  prisma: PrismaClient,
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
  prisma: PrismaClient,
  id: number
) => {
  const userProfilePicture = await prisma.userProfilePictures.delete({
    where: { id },
  });

  return userProfilePicture;
};
