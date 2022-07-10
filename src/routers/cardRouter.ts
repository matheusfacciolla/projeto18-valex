import { Router } from "express";
import { createCard, activateCard, getBalanceAndStats, cardBlock, cardDesblock } from "../controllers/cardController.js";
import { employeeMiddleware } from "../middlewares/employeeMiddleware.js";
import { authenticationApiKey } from "../middlewares/apiKeyMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCardSchema } from "../schemas/createCardSchema.js";
import { activateCardSchema } from "../schemas/activateCardSchema.js";
import { balanceCardSchema } from "../schemas/balanceCardSchema.js";
import { blockAndDesblockCardSchema } from "../schemas/blockAndDesblockCardSchema.js";

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
  validateSchema(balanceCardSchema),
  getBalanceAndStats
);

cardRouter.put(
  "/blockcard",
  authenticationApiKey,
  validateSchema(blockAndDesblockCardSchema),
  cardBlock
);

cardRouter.put(
  "/desblockcard",
  authenticationApiKey,
  validateSchema(blockAndDesblockCardSchema),
  cardDesblock
);

export default cardRouter;
