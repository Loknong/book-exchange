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

export interface CreateUserAddressRequest {
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
}

export interface UpdateUserAddressRequest {
  userId?: number;
  houseNumber?: string;
  village?: string;
  street?: string;
  subdistrict?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
}

export interface UserAddressResponse {
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
