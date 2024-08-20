import { Router } from "express";
import { availabeActions } from "../controllters/action.controller";

const router = Router();

router.get("/available", availabeActions);

export default router;
