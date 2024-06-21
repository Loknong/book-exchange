export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  credit: number;
  token?: string;
  pictureId?: number;
  isLoggedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiredAt: Date;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  credit?: number;
  token?: string;
  pictureId?: number;
  isLoggedIn?: boolean;
  expiredAt?: Date;
}




export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  credit: number;
  isLoggedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
}
