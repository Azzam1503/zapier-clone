import Router from "express";
import { createZap, getZap } from "../controllters/zap.controller";

const router = Router();

router.post("/", createZap);
router.get("/:id", getZap);

export default Router;