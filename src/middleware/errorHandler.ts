import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (createHttpError.isHttpError(err)) {
    res.status(err.status).json({
      error: err.message,
    });
    return;
  }
  res.status(500).json({
    error: "Internal Server Error",
  });
  return;
}
