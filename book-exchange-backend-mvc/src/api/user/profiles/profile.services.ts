import { PrismaClient } from "@prisma/client";
import { UserProfileRequest } from "./profile.types";
import { not } from "joi";

// Get User Profile: Retrieving user profile details.
export const getUserProfile = async (prisma: PrismaClient, userId: number) => {
  console.log("userId", userId);

  const userProfileTemp = await prisma.users.findMany({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      credit: true,
      username: true,
      profilePictures: {
        where: { isActive: true },
        select: {
          id: true,
          name: true,
        },
      },
      addresses: {
        select: {
          houseNumber: true,
          district: true,
          province: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  const userProfile = userProfileTemp.map((user) => {
    const profilePictures = user.profilePictures[0].name;
    const addresses = user.addresses[0];
    return {
      ...user,
      profilePictures,
      addresses,
    };
  });

  return userProfile;
};

// Update User Profile: Updating user profile details.
export const updateUserProfile = async (
  prisma: PrismaClient,
  userId: number
) => {};

// Add Profile Picture: Adding a profile picture for a user.
export const updateUserProfileImage = async (
  prisma: PrismaClient,
  userId: number
) => {};

// Delete Profile Picture: Deleting a profile picture for a user.
