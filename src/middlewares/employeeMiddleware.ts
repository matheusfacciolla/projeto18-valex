import { Request, Response, NextFunction } from "express";

import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

export async function employeeExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { employeeId }: { employeeId: number } = req.body;

  const employee = await employeeRepository.findById(employeeId);

  if (!employee) {
    throw { type: "Not_Found", message: "This employee does not exist" };
  }

  res.locals.employee = employee;

  next();
}

export async function uniqueCardType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    cardType,
    employeeId,
  }: { cardType: cardRepository.TransactionTypes; employeeId: number } =
    req.body;

  const card = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );

  if (card) {
    throw {
      type: "Conflict",
      message: "The employee already has a card of this type",
    };
  }

  next();
}

export const employeeMiddleware = {
  employeeExists,
  uniqueCardType,
};
