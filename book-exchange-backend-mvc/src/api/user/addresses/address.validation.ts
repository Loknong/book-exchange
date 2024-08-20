import Joi from "joi";
import {
  CreateAddressRequest,
  CreateAddressRequestAuth,
  DeleteAddressRequest,
  DeleteAddressRequestAuth,
  GetUserAddressList,
  UpdateAddressRequest,
  UpdateAddressRequestAuth,
} from "./address.types";

export const createAddressSchema = Joi.object<CreateAddressRequestAuth>({
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
  useThis: Joi.boolean().optional().default(false),
  user: Joi.object({
    id: Joi.number().required(),
    role: Joi.string().required(),
  }),
});

export const deleteAddressSchema = Joi.object<DeleteAddressRequestAuth>({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  user: Joi.object({
    id: Joi.number().required(),
    role: Joi.string().required(),
  }),
});

export const updateUserAddressSchema = Joi.object<UpdateAddressRequestAuth>({
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
  user: Joi.object({
    id: Joi.number().required(),
    role: Joi.string().required(),
  }),
});

export const userAddressListSchema = Joi.object<GetUserAddressList>({
  userId: Joi.number().required(),
  addressMode: Joi.string().valid("Partial", "Full").required(),
  user: Joi.object({
    id: Joi.number().required(),
    role: Joi.string().required(),
  }),
});
