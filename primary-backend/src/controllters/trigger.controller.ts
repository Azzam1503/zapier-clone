import { Response } from "express";
import { CustomRequest } from "../middlewares/auth.middleware";
import { prismaClient } from "../db";

export const availabeTiggers = async (req: CustomRequest, res: Response) => {
  try {
    const availabeTiggers = await prismaClient.availableTriggers.findMany({});
    res.json({
      availabeTiggers,
    });
  } catch (error) {
    console.log("error in the availabe trigger", error);
  }
};
