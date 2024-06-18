export interface UserProfilePicture {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export interface CreateUserProfilePictureRequest {
  userId: number;
  name: string;
  isActive : boolean
}

export interface UpdateUserProfilePictureRequest {
  userId?: number;
  name?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface UserProfilePictureResponse {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}
