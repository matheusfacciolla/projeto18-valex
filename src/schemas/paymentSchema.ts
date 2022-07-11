import Joi from "joi";

export const paymentSchema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().length(4).required(),
  businessId: Joi.number().required(),
  amount: Joi.number().required(),
});