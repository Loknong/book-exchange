export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userPassword: string;
  credit?: number;
  resetToken?: string;
  tokenExpiration?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserList {
  users: User[];
}
