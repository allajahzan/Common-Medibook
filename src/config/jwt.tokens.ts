import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ForbidonError } from "../errors/error.forbidon";

export interface JWTPayloadType {
    userid: string;
    role: string;
}

export const GenerateJwtAccessToken = (
    payload: JWTPayloadType,
    secret: string,
    duration: string
) => {
    try {
        return jwt.sign(payload, secret, { expiresIn: duration });
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const VerifyAccessToken = (secret: string) => {
    return function (req: Request, next: NextFunction) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) throw new ForbidonError();

            const payload = jwt.verify(token as string, secret);
            if (!payload) throw new ForbidonError();

            req.body = payload;
            next();
        } catch (err: any) {
            next(err);
        }
    };
};
