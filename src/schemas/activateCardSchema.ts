import Joi from "joi";

export const activateCardSchema = Joi.object({
  id: Joi.number().required(),
  securityCode: Joi.string().length(3).required(),
  password: Joi.string().length(4).required(),
});
