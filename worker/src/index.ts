import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./parser";
const client = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka  = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main(){
    const consumer = kafka.consumer({groupId: 'main-worker'});
    await consumer.connect();

    const producer = kafka.producer();
    await producer.connect();

    await consumer.subscribe({topic: TOPIC_NAME, fromBeginning: true});

    await consumer.run({
        autoCommit:false,
        eachMessage: async ({topic, partition, message}) =>{
            console.log({
                partition, 
                offset: message.offset,
                value: message.value?.toString(),
            });

            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage  = parsedValue.stage;
            const zapRunDetails = await client.zapRun.findFirst({
                where:{
                    id: zapRunId
                },
                include:{
                    zap: {
                        include:{
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            });

            const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);
            if(!currentAction) {
                console.log("Current action not found");
                return;
            };
            const zapRunMetadata = zapRunDetails?.metadata;
            if(currentAction.type.id === "email"){
                console.log("send out email")
                //TODO Parse the email from the body
                const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
                const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
                console.log(`Sending out email to ${to} and body is ${body}`);
            };

            // await new Promise(r => setTimeout(r, 500));
            
            if(currentAction.type.id === "send-sol"){
                console.log("send out solana")
                //TODO Parse the email from the body
                const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
                const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
                console.log(`Sending out solana worth ${amount} to the address ${address}`); 

            };

            const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;
            if(lastStage !== stage){
               await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
            };

            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition,
                offset: (parseInt(message.offset) + 1).toString()
            }]);
        }
    });   
}

main();