import { Router } from "express";
import { loginUser, createUser } from './../controllters/user.controller';


const router = Router();

router.post("/sigin-up", createUser);
router.post("/sigin-in", loginUser);

export default router;