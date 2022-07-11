import { Request, Response } from "express";

import * as paymentService from "../services/paymentService.js";

export async function cardPayment(req: Request, res: Response) {
  const { cardId, password, businessId, amount }: { cardId: number; password: string, businessId: number, amount: number } = req.body;

  await paymentService.cardPayment(cardId, password, businessId, amount);
  return res.sendStatus(200);
}