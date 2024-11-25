import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ForbidonError } from "../errors/error.forbidon";

export interface JWTPayloadType {
    userid: string;
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

// export const VerifyAccessToken = (
//     secret: string
// ): (req: Request, next: NextFunction) => void => {
//     return function (req: Request, next: NextFunction) {
//         try {
//             const token = req.headers["authorization"]?.split(" ")[1];
//             if (!token) throw new ForbidonError();

//             const payload = jwt.verify(token as string, secret);
//             if (!payload) throw new ForbidonError();

//             console.log("reached here");
            

//             req.body = payload;

//             console.log(req.body);
            
//             next();
//         } catch (err: any) {
//             next(err);
//         }
//     };
// };
