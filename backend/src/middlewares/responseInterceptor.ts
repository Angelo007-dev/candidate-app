import { NextFunction, Request, Response } from "express";
import { timeStamp } from "node:console";

export const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
    const originalResJson = res.json;
    res.json = function (body): Response {
        const standardRes = {
            success: res.statusCode < 400,
            data: body,
            timeStamp: new Date().toISOString(),
        };
        return originalResJson.call(this, standardRes);
    };
    next();
}