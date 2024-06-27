import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, UserLoginRequest } from "./auth.types";

// registerUser
export const registerUser = async (
  prisma: PrismaClient,
  data: CreateUserRequest
) => {
  try {
    const user = await prisma.users.create({ data });
    // console.log("User", user);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
  } catch (error) {
    console.error("Error registering user with profile:", error);
    throw new Error(
      "Failed to register user with profile. Please check the provided data."
    );
  }
};

// registerUserTransaction
export const registerUserWithProfile = async (
  prisma: PrismaClient,
  data: CreateUserRequest,
  profileData: string
) => {
  try {
    console.log("Enter");

    return prisma.$transaction(async (transactionPrisma) => {
      const tempUser = await transactionPrisma.users.create({ data: data });
      const profile = await transactionPrisma.userProfilePictures.create({
        data: {
          userId: tempUser.id,
          name: profileData,
          isActive: true,
        },
      });
      const user = await transactionPrisma.users.update({
        where: { id: tempUser.id },
        data: { pictureId: profile.id },
      });

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        imageUrl: profile.name,
      };
    });
  } catch (error) {
    console.error("Error registering user with profile:", error);
    throw new Error(
      "Failed to register user with profile. Please check the provided data."
    );
  }
};

// loginUser
export const loginUser = async (
  prisma: PrismaClient,
  data: UserLoginRequest
) => {
  const result = await prisma.users.update({
    where: { username: data.username, password: data.password },
    data: {
      isLoggedIn: true,
    },
  });

  console.log("Result", result);

  return {
    id: result.id,
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    username: result.username,
    credit: result.credit,
    isLoggedIn: result.isLoggedIn,
  };
};

// logoutUser
export const logoutUser = async (prisma: PrismaClient, userId: number) => {
  const result = await prisma.users.update({
    where: { id: userId },
    data: { isLoggedIn: false },
  });
  return {
    id: result.id,
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    username: result.username,
    isLoggedIn: result.isLoggedIn,
  };
};
