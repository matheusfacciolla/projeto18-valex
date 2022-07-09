import { Request, Response, NextFunction } from "express";

import * as companyRepository from "../repositories/companyRepository.js";

export async function authenticationApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.headers["x-api-key"].toString();
  const company = await companyRepository.findByApiKey(key);

  if (!company) {
    throw { type: "Unauthorized", message: "Wrong API Key" };
  }

  next()
}
