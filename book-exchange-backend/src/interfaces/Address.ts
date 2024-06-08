export interface Address {
  addressId: number;
  userId: number;
  houseNumber: number;
  village: string;
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
