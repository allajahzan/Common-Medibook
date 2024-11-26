import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/error.cutsom";

export const ErrorHandler = (
    error: ErrorCallback,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        if (error instanceof CustomError) {
            res.status(error.StatusCode).json(error.serializeError());
        } else {
            res.status(501).json({ message: error });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Critical server error" });
    }
};
