"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUpdateException = void 0;
const common_1 = require("@nestjs/common");
class PasswordUpdateException extends common_1.HttpException {
    constructor(message) {
        console.log(message);
        super({ message, status: common_1.HttpStatus.BAD_REQUEST }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.PasswordUpdateException = PasswordUpdateException;
//# sourceMappingURL=unauthorized.exception.js.map