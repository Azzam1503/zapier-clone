import { Router } from "express";
import { loginUser, createUser } from './../controllters/user.controller';
import authCheck from "../middlewares/auth.middleware";


const router = Router();

router.post("/sign-up", createUser);
router.post("/sign-in", authCheck, loginUser);

export default router;