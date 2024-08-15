import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient();

app.use(express.json());
//Passowrd logic
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
	const userId = req.params.userId;
	const zapId = req.params.zapId;
	const body = req.body;
	//Store in db a new trigger

	try {
		await client.$transaction(async tx => {
			const run = await tx.zapRun.create({
				data: {
					zapId: zapId,
					metadata: body
				}
			})
		
			await tx.zapRunOutbox.create({
				data: {
					zapRunId: run.id,
				}
			})
		})
		res.json({
			message: "Webhook received"
		})
	} catch (error) {
		console.log("in the error block", error);
	}
	//push it to a queue (kafka/redis);
})

app.listen(4000, () => {
	console.log("Server is running")
})