import { Request, Response } from "express";

import * as rechargeService from "../services/rechargeService.js";

export async function cardRecharge(req: Request, res: Response) {
  const { cardId, amount }: { cardId: number; amount: number } = req.body;

  await rechargeService.cardRecharge(cardId, amount);
  return res.sendStatus(200);
}
