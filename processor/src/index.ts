import { PrismaClient } from '@prisma/client';
import {Kafka} from "kafkajs";
const client = new PrismaClient();

const TOPIC = "zap-events";

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})


async function main() {
    const producer = kafka.producer();
    await producer.connect();
    while(true){
        const pendingRows = await client.zapRunOutbox.findMany({
            where: {},
            take: 10
        });

      
        producer.send({
            topic: TOPIC,
            messages: pendingRows.map((row) => ({
                value: JSON.stringify({zapRunId: row.zapRunId, stage: 0})
            }))   
            
        })

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(row => row.id)
                }
            }
        })
        
    }
}

main();