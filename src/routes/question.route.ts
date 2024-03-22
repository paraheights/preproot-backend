import express from "express";
import { createQuestion } from "../controllers/question.controller";

const questionRouter = express.Router();

questionRouter.post("/save", createQuestion);

export { questionRouter };
