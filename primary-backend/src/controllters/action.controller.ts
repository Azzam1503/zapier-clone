import { Response } from "express";
import { CustomRequest } from "../middlewares/auth.middleware";
import { prismaClient } from "../db";

export const availabeActions = async (req: CustomRequest, res: Response) => {
  try {
    const actions = await prismaClient.availableActions.findMany({});
    return res.status(200).json({ actions });
  } catch (error) {
    console.log("error in available actions", error);
  }
};
