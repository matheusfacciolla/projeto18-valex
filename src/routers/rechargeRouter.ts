import { Router } from "express";
import { cardRecharge } from "../controllers/rechargeController.js";
import { authenticationApiKey } from "../middlewares/apiKeyMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rechargeSchema } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post(
  "/cardrecharge",
  authenticationApiKey,
  validateSchema(rechargeSchema),
  cardRecharge
);

export default rechargeRouter