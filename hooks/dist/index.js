"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.use(express_1.default.json());
//Passowrd logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    //Store in db a new trigger
    try {
        await client.$transaction(async (tx) => {
            const run = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            });
            await tx.zapRunOutbox.create({
                data: {
                    zapRunId: run.id,
                }
            });
        });
        res.json({
            message: "Webhook received"
        });
    }
    catch (error) {
        console.log("in the error block", error);
    }
    //push it to a queue (kafka/redis);
});
app.listen(4000, () => {
    console.log("Server is running");
});
