import { Response } from "express";
import { Result } from "./result";

class ApiResponse {
  status: number;
  data: any | null;
  message: string;
  success: boolean;

  constructor({
    status,
    data,
    message = `Request successful!`,
  }: {
    status: number;
    data: any | null;
    message?: string;
  }) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}

const ApiResponseHandler = ({
  res,
  status = 200,
  message,
  data,
}: {
  res: Response;
  status?: number;
  message?: string;
  data: any | null;
}) => {
  const apiResponse = new ApiResponse({
    status,
    data,
    message,
  });

  res.status(apiResponse.status).json(
    new Result({
      status: apiResponse.status,
      success: apiResponse.success,
      error: null,
      message: apiResponse.message,
      data: apiResponse.data,
    })
  );
};

export { ApiResponse, ApiResponseHandler };
