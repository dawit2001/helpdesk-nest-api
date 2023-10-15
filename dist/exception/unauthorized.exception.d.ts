import { HttpException } from '@nestjs/common';
export declare class PasswordUpdateException extends HttpException {
    constructor(message: string);
}
