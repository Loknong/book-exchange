import { UserAddress } from "@prisma/client";
import { AuthenticatedUser } from "@src/middlewares/authMiddleware";

export interface CreateAddressRequest {
  userId: number;
  houseNumber: string;
  village?: string;
  street?: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
  useThis?: boolean;
}
export interface CreateAddressRequestAuth extends CreateAddressRequest {
  user: AuthenticatedUser;
}

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

export interface UpdateAddressRequestAuth extends UpdateAddressRequest {
  user: AuthenticatedUser;
}

export interface UpdateAddressResponse extends UserAddress {}

export interface DeleteAddressRequest {
  id: number;
  userId: number;
}

export interface DeleteAddressRequestAuth extends DeleteAddressRequest {
  user: AuthenticatedUser;
}

export interface DeleteAddressResponse extends UserAddress {}

export interface GetUserAddressList {
  userId: number;
  addressMode: "Partial" | "Full";
  user: AuthenticatedUser;
}
