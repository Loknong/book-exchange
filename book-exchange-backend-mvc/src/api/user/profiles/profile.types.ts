export interface UpdateUserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  addressId?: number;
}

export interface UpdateUserImage {
  userId: number;
}

export interface UserProfileRequest {
  userId: number;
}
