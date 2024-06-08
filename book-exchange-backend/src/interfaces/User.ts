export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userPassword: string;
  credit?: number;
  createdAt: Date;
  updatedAt: Date;
  isLogin: boolean;
  expiredDate: Date;
  token: string;
}
