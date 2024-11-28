import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ForbidonError } from "../errors/error.forbidon";
import { Unauthorized } from "../errors/error.unathorized";

export interface JWTPayloadType {
    _id: string;
    role: string;
}

export const GenerateJwtToken = (
    payload: JWTPayloadType,
    secret: string,
    duration: string
): string => {
    try {
        return jwt.sign(payload, secret, { expiresIn: duration });
    } catch (err: any) {
        throw new Error(err.message);
    }
};

const isTokenExpired = (token: string): boolean => {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded || !decoded.exp) {
        throw new ForbidonError();
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
};

export const VerifyAccessToken = (
    secret: string
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) throw new ForbidonError();

            if (isTokenExpired(token)) {
                throw new Unauthorized("Token expired");
            }

            console.log(secret);
            

            const payload = jwt.verify(token as string, secret);
            if (!payload) throw new ForbidonError();

            console.log(payload);
            

            req.headers["x-user-payload"] = JSON.stringify(payload);

            next();
        } catch (err: any) {
            next(err);
        }
    };
};
