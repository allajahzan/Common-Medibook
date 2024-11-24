import { CustomError } from "./error.cutsom";

export class ForbidonError extends CustomError {
    StatusCode: number = 403;

    constructor() {
        super("Forbidden");
    }

    serializeError(): { message: string }[] {
        return [{ message: "Forbidden" }];
    }
}
