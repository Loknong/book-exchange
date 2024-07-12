import { PrismaClient } from "@prisma/client";
import { CreateUserRequest, UserLoginRequest } from "./auth.types";
import bcrypt from "bcryptjs";

// registerUser
export const registerUser = async (
  prisma: PrismaClient,
  data: CreateUserRequest
) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.users.create({
      data: { ...data, password: hashedPassword },
    });
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
    console.log("Gamu");
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.$transaction(async (transactionPrisma) => {
      const tempUser = await transactionPrisma.users.create({
        data: { ...data, password: hashedPassword },
      });
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
        password: user.password,
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
  try {
    const user = await prisma.users.findUnique({
      where: { username: data.username },
    });

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid username or password.");
    }

    const result = await prisma.users.update({
      where: { id: user.id },
      data: { isLoggedIn: true },
    });

    return {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      username: result.username,
      credit: result.credit,
      isLoggedIn: result.isLoggedIn,
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error(
      "Failed to login. Please check your username and password."
    );
  }
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
