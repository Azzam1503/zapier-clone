import { Router } from "express";
import { availabeTiggers } from "../controllters/trigger.controller";

const router = Router();

router.get("/available", availabeTiggers);

export default router;
