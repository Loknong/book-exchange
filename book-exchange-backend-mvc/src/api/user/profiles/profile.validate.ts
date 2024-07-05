import Joi from "joi";
import { UserProfileRequest } from "./profile.types";
// get user profile
export const getUserProfileSchema = Joi.object({
    params: Joi.object({
      userId: Joi.number().required(),
    }),
    query: Joi.object({
      details: Joi.boolean().optional(),
      withAddress: Joi.boolean().optional(),
      withPicture: Joi.boolean().optional(),
      roles: Joi.boolean().optional(),
      activityLogs: Joi.boolean().optional(),
      accountStatus: Joi.boolean().optional(),
      transactions: Joi.boolean().optional(),
      notifications: Joi.boolean().optional(),
    }).optional(),
  });

// get user list with profile