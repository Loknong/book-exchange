// src/api/users/auth/auth.validation.ts
import Joi from "joi";
import {
  CreateUserRequest,
  UserLoginRequest,
  UserLogoutRequest,
} from "./auth.types";

export const createUserSchema = Joi.object<CreateUserRequest>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object<UserLoginRequest>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});


export const logoutUserSchema = Joi.object<UserLogoutRequest>({
  userId: Joi.number().required(),
});


export const userIdSchema = Joi.object({
  userId: Joi.number().integer().required(),
});

export const searchUserSchema = Joi.object({
  username: Joi.string().required(),
});
