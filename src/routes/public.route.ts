import express from "express";
import { healthCheck } from "../controllers/public.controller";

const publicRouter = express.Router();

publicRouter.get("/health", healthCheck);

export { publicRouter };
