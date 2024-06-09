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
  userPictureId: number;
}

export interface UserProfilePicture {
  
}

export interface UserSignup {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userPassword: string;
}

export interface UserLogin {
  username: string;
  userPassword: string;
  //jwt : string
}

export interface UserProfile extends User {}

export interface UserResponse {
  message: string;
  data: object;
}

// User Management Interface
export interface UserEdit {
  userId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
}
