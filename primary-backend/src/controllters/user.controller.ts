import { Request, Response } from "express";
import { SignupSchema } from "../types";
export const createUser = async (req: Request, res: Response) => {
   const {username, password} = req.body;
   const isValid = SignupSchema.safeParse({username, password});
   if(!isValid.success) return res.json({message: "Invlaid credentials"});
   res.json({username, password})
};

export const loginUser = async (req: Request, res: Response) => {
    console.log("login user");
}

