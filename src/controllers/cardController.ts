import { Request, Response } from "express";

import * as cardRepository from "../repositories/cardRepository.js";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const { employeeId, cardType }: { employeeId: number, cardType: cardRepository.TransactionTypes } = req.body;

  await cardService.createCard(employeeId, cardType);
  const cardCreated = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
  return res.status(201).send(cardCreated);
}

export async function activateCard(req: Request, res: Response) {
  const { id, securityCode, password }: { id: number; securityCode: string; password: string;} = req.body;

  await cardService.activateCard(id, securityCode, password);
  return res.sendStatus(200);
}

export async function getBalanceAndStats(req: Request, res: Response) {
  const { cardId }: { cardId: number } = req.body;

  const balance = await cardService.getBalanceAndStats(cardId);
  return res.send(balance).status(200);
}

export async function cardBlock(req: Request, res: Response) {
  const { cardId, password }: { cardId: number, password: string } = req.body;

  await cardService.cardBlock(cardId, password);
  return res.sendStatus(200);
}

export async function cardDesblock(req: Request, res: Response) {
  const { cardId, password }: { cardId: number, password: string } = req.body;

  await cardService.cardDesblock(cardId, password);
  return res.sendStatus(200);
}
