import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_PASSWORD } from "../config";
import { prismaClient } from "../db";
import { User } from "@prisma/client";

export interface CustomRequest extends Request{
    user?: Omit<User, 'password'>
}


const authCheck = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.Authorization;
        if(!token) return res.status(403).json({success: false, message: "user not logged in"});
        const decoded = jwt.verify(token, JWT_PASSWORD);
        if(!decoded) return res.status(403).json({success: false, message: "Unauthorized"});
        console.log(decoded.sub);
        const user = await prismaClient.user.findFirst({
            where:{
                id: Number(decoded.sub)
            }
        });

        if (!user) return res.status(403).json({ success: false, message: "Unauthorized" });
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword;
        next();
    } catch (error) {
        console.log("error in auth middleware", error);
    }
}

export default authCheck;