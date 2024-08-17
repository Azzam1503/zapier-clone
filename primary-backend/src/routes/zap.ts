import Router from "express";
import { createZap, getZap, getZaps } from "../controllters/zap.controller";
import authCheck from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authCheck, createZap);
router.get("/zaps", authCheck, getZaps);
router.get("/:id", authCheck, getZap);

export default router;