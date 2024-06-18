import { PrismaClient } from "@prisma/client";

import * as userModel from '../models/users.services'
import { CreateUserRequest } from "@src/types";

export const registerUser = async (prisma:PrismaClient, data: CreateUserRequest) => {
    const user = await userModel.createUser(prisma, data)
    return user;
}

// export const registerUserWithProfile = async 