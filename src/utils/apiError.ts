import { NextFunction, Request, Response } from "express";
import { Result } from "./result";

class CustomError extends Error {
  status: number;
  success: boolean;
  error: any | null;

  constructor({
    status,
    message,
    error = {},
    stack,
  }: {
    status: number;
    message: string;
    error?: any | null;
    stack?: string;
  }) {
    super(message);
    this.status = status;
    this.message = message;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const ApiErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    status = 500,
    message = `Internal Server Error occurred!`,
    success = false,
    error,
    stack,
  } = err;

  console.error(err);

  res.status(status).json(
    new Result({
      status,
      success,
      error,
      message,
    })
  );
};

export { CustomError, ApiErrorHandler };
