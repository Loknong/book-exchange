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
  addressId?: number;
  isLoggedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiredAt: Date;
}

export interface UserAddress {
  id: number;
  userId: number;
  houseNumber: string;
  village?: string;
  street?: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
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
