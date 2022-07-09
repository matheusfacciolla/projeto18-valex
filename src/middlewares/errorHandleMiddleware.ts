import { NextFunction, Request, Response } from "express";

export default function handleErrorsMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "Bad_Request") {
    res.sendStatus(400);
  }
  if (error.type === "Unauthorized") {
    res.sendStatus(401);
  }
  if (error.type === "Not_Found") {
    res.sendStatus(404);
  }
  if (error.type === "Conflict") {
    res.sendStatus(409);
  }
  if (error.type === "Unprocessable_Entity") {
    res.sendStatus(422);
  }
  res.sendStatus(500)
}
