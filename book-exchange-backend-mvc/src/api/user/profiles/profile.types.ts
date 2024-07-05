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
  query: {
    details?: string;
    withAddress?: "full" | "short" ;
    withPicture?: string;
    roles?: string;
    activityLogs?: string;
    accountStatus?: string;
    transactions?: string;
    notifications?: string;
  };
}
