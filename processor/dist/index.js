"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const client = new client_1.PrismaClient();
const TOPIC = "zap-events";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while (true) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where: {},
            take: 10
        });
        producer.send({
            topic: TOPIC,
            messages: pendingRows.map((row) => ({
                value: row.zapRunId
            }))
        });
        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(row => row.id)
                }
            }
        });
    }
}
main();
