import { Request, Response } from "express";
import { SignInSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import bcrytjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const createUser = async (req: Request, res: Response) => {
try {
       const {name, email, password} = req.body;
       const parsed = SignupSchema.safeParse({name, email, password});
       if(!parsed.success) return res.json({message: "Invlaid credentials"});
       const isExisting =  await prismaClient.user.findFirst({
        where: {
            email
        }
       });
    
       if(isExisting) return res.status(401).json({message: "User already exists"});
       const hashedPassword = await bcrytjs.hash(password, 10);
       const newUser = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
       });
       console.log(newUser);

       //TODO Send verification email

       return res.status(200).json(newUser);
       
} catch (error) {
    console.log("error in create User", error)
}
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const parsed = SignInSchema.safeParse({email, password});
        if(!parsed.success) return res.json({message: "Invlaid credentials"});
        const user = await prismaClient.user.findFirst({
            where:{
                email
            }
        });
        if(!user) return res.status(401).json({message: "Incorrect credentials"});
        const matchPassword = await bcrytjs.compare(password, user.password);
        if(!matchPassword) return res.status(401).json({message: "Incorrect credentials"});
   
        const exp = Date.now() + 1000*60 * 60 * 24 * 30;
        const token =  jwt.sign({sub: user.id, email: user.email, name: user.name, exp}, JWT_PASSWORD);
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
        return res.json({token});

    } catch (error) {
        console.log("error in login user", error);
    }
}

