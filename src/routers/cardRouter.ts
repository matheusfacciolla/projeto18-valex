import { Router } from "express";
import { createCard, activateCard, getBalanceAndStats, cardBlock, cardDesblock } from "../controllers/cardController.js";
import { authenticationApiKey } from "../middlewares/apiKeyMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCardSchema } from "../schemas/createCardSchema.js";
import { activateCardSchema } from "../schemas/activateCardSchema.js";
import { blockAndDesblockCardSchema } from "../schemas/blockAndDesblockCardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/createcard",
  authenticationApiKey,
  validateSchema(createCardSchema),
  createCard
);

cardRouter.put(
  "/activatecard",
  validateSchema(activateCardSchema),
  activateCard
);

cardRouter.get(
  "/cardbalance/:cardId",
  getBalanceAndStats
);

cardRouter.put(
  "/blockcard",
  validateSchema(blockAndDesblockCardSchema),
  cardBlock
);

cardRouter.put(
  "/desblockcard",
  validateSchema(blockAndDesblockCardSchema),
  cardDesblock
);

export default cardRouter;
