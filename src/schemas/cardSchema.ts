import Joi from "joi";

export const cardSchema = Joi.object({
  employeeId: Joi.number().required(),
  cardType: Joi.equal(
    "groceries",
    "restaurant",
    "transport",
    "education",
    "health"
  ),
});
