import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMidlleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;
        (req as any).user = decoded;
        next();
    } catch (err: any) {
        return res.status(401).json({ message: "Invalid token" })
    }
}