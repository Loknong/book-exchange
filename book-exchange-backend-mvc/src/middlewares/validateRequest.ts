import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (
  bodySchema?: Joi.ObjectSchema,
  querySchema?: Joi.ObjectSchema,
  paramsSchema?: Joi.ObjectSchema
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (bodySchema) {
      const { error } = bodySchema.validate(req.body);
      if (error) {
        console.log("bodySchema", error);

        return res.status(400).json({ error: error.details[0].message });
      }
    }

    if (querySchema) {
      const { error } = querySchema.validate(req.query);
      if (error) {
        console.log("querySchema", error);

        return res.status(400).json({ error: error.details[0].message });
      }
    }

    if (paramsSchema) {
      const { error } = paramsSchema.validate(req.params);
      if (error) {
        console.log("paramsSchema", error);

        return res.status(400).json({ error: error.details[0].message });
      }
    }

    next();
  };
};
