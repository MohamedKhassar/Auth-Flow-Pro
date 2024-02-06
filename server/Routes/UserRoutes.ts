import { Router } from "express";
import { signUp } from "../Controllers/AuthController";

export const router = Router();

router.post("/signup", signUp)