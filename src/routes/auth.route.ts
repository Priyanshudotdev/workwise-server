// prefix: /auth

import { Router } from "express";
import { regsiterHandler } from "../controllers/auth.controller";

const authRouter = Router();

// /auth/register
authRouter.post("/register", regsiterHandler);

export default authRouter;
