import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { employeeMiddleware } from "../middlewares/employeeMiddleware.js";
import { authenticationApiKey } from "../middlewares/apiKeyMiddleware.js";

const cardRouter = Router();

cardRouter.post(
  "/createcard",
  authenticationApiKey,
  employeeMiddleware.employeeExists,
  employeeMiddleware.uniqueCardType,
  validateSchema,
  createCard
);

export default cardRouter;
