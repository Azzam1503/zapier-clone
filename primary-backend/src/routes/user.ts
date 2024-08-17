import { Router } from "express";
import { loginUser, createUser } from './../controllters/user.controller';


const router = Router();

router.post("/sign-up", createUser);
router.post("/sign-in", loginUser);

export default router;