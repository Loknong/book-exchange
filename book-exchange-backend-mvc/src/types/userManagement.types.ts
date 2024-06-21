export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  username: string;
  token: string;
}

export interface UpdateUserProfileRequest {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  profilePicture?: string;
}

export interface UpdateUserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profilePicture: string;
}
