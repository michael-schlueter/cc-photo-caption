import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const token = authorization?.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch (err: any) {
        res.status(500).send({
            message: err.message
        })
    }
    
    return next();
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.payload?.userId
            }
        })
    
        if (user?.isAdmin === false) {
            res.status(403).send({
                message: 'Not authorized'
            })
        }
    } catch(err: any) {
        res.status(500).send({
            message: err.message
        })
    }

    return next();
}