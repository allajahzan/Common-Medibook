import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, NextFunction } from "express";
import { ForbidonError } from "../errors/error.forbidon";

export interface JWTpayloadType {
    userid: string;
    role: string;
}

export const generateJwtAccessToken = (
    payload: JWTpayloadType,
    secret: string,
    duration: string
) => {
    try {
        return jwt.sign(payload, secret, { expiresIn: duration });
    } catch (err: any) {
        throw new Error(err.message);
    }
};

export const verifyAccessToken = (
    req: Request,
    next: NextFunction,
    secret: string
) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) throw new ForbidonError();

        const payload = jwt.verify(token, secret) as JwtPayload;
        if (!payload) throw new ForbidonError();

        req.body = payload;

        next();
    } catch (err: any) {
        next(err);
    }
};
