import { Router } from "express";
import { createCard, activateCard, getBalanceAndStats } from "../controllers/cardController.js";
import { employeeMiddleware } from "../middlewares/employeeMiddleware.js";
import { authenticationApiKey } from "../middlewares/apiKeyMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCardSchema } from "../schemas/createCardSchema.js";
import { activateCardSchema } from "../schemas/activateCardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/createcard",
  authenticationApiKey,
  employeeMiddleware.employeeExists,
  employeeMiddleware.uniqueCardType,
  validateSchema(createCardSchema),
  createCard
);

cardRouter.put(
  "/activatecard",
  authenticationApiKey,
  validateSchema(activateCardSchema),
  activateCard
);

cardRouter.get(
  "/cardbalance",
  authenticationApiKey,
  getBalanceAndStats
);

export default cardRouter;
