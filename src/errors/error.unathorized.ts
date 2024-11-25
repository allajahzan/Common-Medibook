import { CustomError } from "./error.cutsom";

export class Unauthorized extends CustomError {
    StatusCode: number = 401;

    constructor(message: string) {
        super(message);
    }

    serializeError(): { message: string }[] {
        return [{ message: this.message }];
    }
}
