// src/models/user.ts
export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
