import { Router } from "express";
import { cardPayment } from "../controllers/paymentController.js";
import { authenticationApiKey } from "../middlewares/apiKeyMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { paymentSchema } from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post(
  "/cardpayment",
  authenticationApiKey,
  validateSchema(paymentSchema),
  cardPayment
);

export default paymentRouter