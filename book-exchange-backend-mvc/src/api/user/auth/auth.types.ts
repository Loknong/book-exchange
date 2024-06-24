import { UserResponse } from "../user.types";

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateUserResponse
  extends Omit<CreateUserRequest, "password"> {
  id: number;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse
  extends Omit<UserResponse, "updatedAt" | "createdAt"> {}

export interface UserLogoutResponse {}
