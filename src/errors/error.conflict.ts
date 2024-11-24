import { CustomError } from "./error.cutsom";

export class ConflictError extends CustomError {
    StatusCode: number = 409;

    constructor(message: string) {
        super(message);
    }

    serializeError(): { message: string }[] {
        return [{ message: this.message }];
    }
}
