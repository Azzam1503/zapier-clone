import { Request, Response } from "express";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";
import { CustomRequest } from "../middlewares/auth.middleware";

export const createZap = async (req: CustomRequest, res: Response) => {
    console.log("here baby");
    try {
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);
    const id = req?.user?.id;
    console.log("req user",id);
    console.log(parsedData.error);
    if(!parsedData.success) return res.status(411).json({message: "Incorrect Inputs"});
    const newZap = await prismaClient.$transaction(async tx => {
        const zap = await tx.zap.create({
            data: {
            userId: Number(id),
            triggerId: "",
            actions: {
                create: parsedData.data.actions.map((x, index) => ({
                    actionId: x.availableActionId,
                    sortingOrder: index
                }))
            }
            }
            
        });
        console.log(zap)
        const trigger = await tx.trigger.create({
            data: {
                trigerrId: parsedData.data.availableTriggerId,
                zapId: zap.id
            }
        })
        console.log("trigger", trigger)
        const updted = await tx.zap.update({
            where: {
                id: zap.id
            },
            data: {
                triggerId: trigger.id
            }
        })
        return zap;
    });
    console.log("new--zap", newZap);
    // @ts-ignore
    return res.json({newZap});
    } catch (error) {
        console.log("in zap create", error);
    }
};

export const getZaps = async (req: Request, res: Response) => {
    try {
            const id = req.body.id;
            const zaps = await prismaClient.zap.findMany({
                where: {
                    userId: id
                },
                include: {
                    actions: {
                        include: {
                            type: true
                        }
                    },
                    trigger: {
                        include: {
                            type: true
                        }
                    }
                },
            });
        
            console.log("zaps");
            return res.json({
                zaps
            })
    } catch (error) {
        console.log("in the zaps", error);
    }
};


export const getZap = async (req: CustomRequest, res: Response) => {
    try {
        console.log("get zap clled")
        const zapId = req.params.zapId;
        const zap = await prismaClient.zap.findFirst({
            where:{
                id: zapId
            },
            include: {
                actions: {
                    include: {
                        type: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            },
        });
        console.log(zap);
        if(zap?.userId != req.user?.id){
            return res.status(403).json({
                message: "Unauthorized"
            })
        };
        return res.json({
            zap
        });
    } catch (error) {
        console.log("in the get Zap", error);
    }
}

