import { Request, Response } from "express";

export const createZap = async (req: Request, res: Response) => {
    console.log("create zap");
};

export const getZap = async (req: Request, res: Response) => {
    console.log(`get zap ${req.params.id}`);
}

