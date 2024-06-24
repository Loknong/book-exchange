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
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
      username : user.username,

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
      return { user, profile };
    });
  } catch (error) {
    console.error("Error registering user with profile:", error);
    throw new Error(
      "Failed to register user with profile. Please check the provided data."
    );
  }
};

// loginUser
export const loginUser = async (prisma: PrismaClient, data:UserLoginRequest) => {
  const 
}