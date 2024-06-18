import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import * as databaseModel from "../models/database.services";
import * as userModel from "../models/users.services";
import * as userProfileModel from "../models/userProfilePictures.services";
import {
  CreateUserProfilePictureRequest,
  CreateUserRequest,
  UserResponse,
} from "@src/types";

export const resetDatabase = async (prisma: PrismaClient) => {
  const resetDatabase = prisma.$transaction(async (transactionPrisma) => {
    await databaseModel.resetDatabase(transactionPrisma);
  });
  console.log("Database reset successfully.");
  return resetDatabase;
};

export const mockDatabase = async (prisma: PrismaClient) => {
  const mockUsers: CreateUserRequest[] = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      password: "password123",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      password: "password123",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      username: "alicejohnson",
      password: "password123",
    },
    {
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      username: "bobbrown",
      password: "password123",
    },
    {
      firstName: "Charlie",
      lastName: "Davis",
      email: "charlie.davis@example.com",
      username: "charliedavis",
      password: "password123",
    },
    {
      firstName: "David",
      lastName: "Wilson",
      email: "david.wilson@example.com",
      username: "davidwilson",
      password: "password123",
    },
    {
      firstName: "Eve",
      lastName: "Taylor",
      email: "eve.taylor@example.com",
      username: "evetaylor",
      password: "password123",
    },
    {
      firstName: "Frank",
      lastName: "Moore",
      email: "frank.moore@example.com",
      username: "frankmoore",
      password: "password123",
    },
    {
      firstName: "Grace",
      lastName: "White",
      email: "grace.white@example.com",
      username: "gracewhite",
      password: "password123",
    },
    {
      firstName: "Henry",
      lastName: "Clark",
      email: "henry.clark@example.com",
      username: "henryclark",
      password: "password123",
    },
  ];

  const createdUsers: UserResponse[] = [];
  return prisma.$transaction(async (transactionPrisma) => {
    // Mock User Info
    for (let index = 0; index < mockUsers.length; index++) {
      const tempUser = await userModel.createUser(transactionPrisma, mockUsers[index]);
      const data: CreateUserProfilePictureRequest = {
        userId: index+1,
        name: `user-${index+1}.jpg`,
        isActive: true,
      };
      const profile = await userProfileModel.createUserProfilePicture(
        transactionPrisma,
        data
      );
      const user = await userModel.updateUser(transactionPrisma, tempUser.id, {
        pictureId: profile.id,
      });

      createdUsers.push(user);
      
    }
    return createdUsers;
  });
};
