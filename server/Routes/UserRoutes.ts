import { Router } from "express";
import { signIn, signUp } from "../Controllers/AuthController";

export const router = Router();

router.post("/signup", signUp)
router.post("/signin", signIn)