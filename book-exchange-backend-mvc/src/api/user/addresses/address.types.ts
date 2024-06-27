import { UserAddress } from "@prisma/client";

export interface CreateAddressRequest extends UserAddress {}

export interface CreateAddressResponse extends CreateAddressRequest {}

export interface UpdateAddressRequest {
  id: number;
  userId: number;
  houseNumber?: string;
  village?: string;
  street?: string;
  subdistrict?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateAddressResponse extends UserAddress {}

export interface DeleteAddressRequest {
  id: number;
}

export interface DeleteAddressResponse extends UserAddress {}

export interface GetUserAddressList {
  userId: number;
  addressMode: 'Partial' | 'Full'
}

