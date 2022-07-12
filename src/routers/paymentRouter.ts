import { Router } from "express";
import { cardPayment } from "../controllers/paymentController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { paymentSchema } from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post(
  "/cardpayment",
  validateSchema(paymentSchema),
  cardPayment
);

export default paymentRouter