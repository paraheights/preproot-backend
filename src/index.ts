require("dotenv").config();
require("./db");
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import bearerToken from "express-bearer-token";
import { ApiErrorHandler } from "./utils/apiError";
import { publicRouter } from "./routes/public.route";
import { questionRouter } from "./routes/question.route";

/* App Setup */
const app = express();
const PORT = 8005;

/* Middlewares */
app.use(cors());
app.use(bearerToken());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* Routes */
app.use("/preproot-api/public", publicRouter);
app.use("/preproot-api/question", questionRouter);

/* Handlers */
app.use(ApiErrorHandler);

/* Listeners */
mongoose.connection.once("open", () => {
  console.log(`MongoDB connection established successfully`);
  app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
});
