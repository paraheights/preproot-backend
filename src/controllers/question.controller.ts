import { NextFunction, Request, Response } from "express";
import { requiredFieldsChecker } from "../utils/requiredFieldsChecker";
import { questionModel } from "../models/question.model";
import { dbSave } from "../utils/dbUtils";
import { CustomError } from "../utils/apiError";
import { ApiResponseHandler } from "../utils/apiResponse";

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, options } = req.body;
    requiredFieldsChecker(req.body, ["text", "options"]);

    const newQuestion = new questionModel({
      text: text,
      options: options,
    });

    const newQuestionSave = await dbSave(newQuestion);
    if (!newQuestionSave.success) {
      throw new CustomError({
        status: newQuestionSave.status,
        message: newQuestionSave.message,
      });
    }

    ApiResponseHandler({
      res: res,
      message: "Successfully created question",
      data: newQuestionSave.data,
    });
  } catch (error) {
    next(error);
  }
};
