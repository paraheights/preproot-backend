import { NextFunction, Request, Response } from "express";
import { ApiResponseHandler } from "../utils/apiResponse";

export const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ApiResponseHandler({
      res: res,
      message: "Server is healthy and operational",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
