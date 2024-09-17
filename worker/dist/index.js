"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const client_1 = require("@prisma/client");
const parser_1 = require("./parser");
const client = new client_1.PrismaClient();
const TOPIC_NAME = "zap-events";
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: 'main-worker' });
        yield consumer.connect();
        const producer = kafka.producer();
        yield producer.connect();
        yield consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
        yield consumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c, _d, _e, _f, _g, _h;
                console.log({
                    partition,
                    offset: message.offset,
                    value: (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                const parsedValue = JSON.parse((_c = message.value) === null || _c === void 0 ? void 0 : _c.toString());
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                const zapRunDetails = yield client.zapRun.findFirst({
                    where: {
                        id: zapRunId
                    },
                    include: {
                        zap: {
                            include: {
                                actions: {
                                    include: {
                                        type: true
                                    }
                                }
                            }
                        }
                    }
                });
                const currentAction = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions.find(x => x.sortingOrder === stage);
                if (!currentAction) {
                    console.log("Current action not found");
                    return;
                }
                ;
                const zapRunMetadata = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.metadata;
                if (currentAction.type.id === "email") {
                    console.log("send out email");
                    //TODO Parse the email from the body
                    const body = (0, parser_1.parse)((_d = currentAction.metadata) === null || _d === void 0 ? void 0 : _d.body, zapRunMetadata);
                    const to = (0, parser_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.email, zapRunMetadata);
                    console.log(`Sending out email to ${to} and body is ${body}`);
                }
                ;
                // await new Promise(r => setTimeout(r, 500));
                if (currentAction.type.id === "send-sol") {
                    console.log("send out solana");
                    //TODO Parse the email from the body
                    const amount = (0, parser_1.parse)((_f = currentAction.metadata) === null || _f === void 0 ? void 0 : _f.amount, zapRunMetadata);
                    const address = (0, parser_1.parse)((_g = currentAction.metadata) === null || _g === void 0 ? void 0 : _g.address, zapRunMetadata);
                    console.log(`Sending out solana worth ${amount} to the address ${address}`);
                }
                ;
                const lastStage = (((_h = zapRunDetails === null || zapRunDetails === void 0 ? void 0 : zapRunDetails.zap.actions) === null || _h === void 0 ? void 0 : _h.length) || 1) - 1;
                if (lastStage !== stage) {
                    yield producer.send({
                        topic: TOPIC_NAME,
                        messages: [{
                                value: JSON.stringify({
                                    stage: stage + 1,
                                    zapRunId
                                })
                            }]
                    });
                }
                ;
                yield consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        partition,
                        offset: (parseInt(message.offset) + 1).toString()
                    }]);
            })
        });
    });
}
main();
