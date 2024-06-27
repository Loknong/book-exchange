import Joi from "joi";
import {
  CreateAddressRequest,
  DeleteAddressRequest,
  GetUserAddressList,
  UpdateAddressRequest,
} from "./address.types";

export const createAddressSchema = Joi.object<CreateAddressRequest>({
  userId: Joi.number().required(),
  houseNumber: Joi.string().required(),
  village: Joi.string().optional().allow(null),
  street: Joi.string().optional().allow(null),
  subdistrict: Joi.string().required(),
  district: Joi.string().required(),
  province: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().optional().default("Thailand"),
  phoneNumber: Joi.string().optional().allow(null),
});

export const deleteAddressSchema = Joi.object<DeleteAddressRequest>({
  id: Joi.number().required(),
});

export const updateUserAddressSchema = Joi.object<UpdateAddressRequest>({
  id: Joi.number().integer().required(),
  userId: Joi.number().integer().optional(),
  houseNumber: Joi.string().optional().allow(null),
  village: Joi.string().optional().allow(null),
  street: Joi.string().optional().allow(null),
  subdistrict: Joi.string().optional().allow(null),
  district: Joi.string().optional().allow(null),
  province: Joi.string().optional().allow(null),
  postalCode: Joi.string().optional().allow(null),
  country: Joi.string().optional().default("Thailand"),
  phoneNumber: Joi.string().optional().allow(null),
});

export const userAddressListSchema = Joi.object<GetUserAddressList>({
  userId: Joi.number().required(),
  addressMode: Joi.string().valid('Partial','Full').required()
});
