"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
const api = process.env.NEST_ENV === 'PRODUCTION'
    ? 'https://kns-support-api.onrender.com'
    : 'http://localhost:8000';
console.log(api);
let EmailService = exports.EmailService = class EmailService {
    constructor(mailerService, authservice) {
        this.mailerService = mailerService;
        this.authservice = authservice;
    }
    async sendVerificationEmail(user, verificationToken) {
        const decodedToken = await this.authservice.verifyEmailtoken(verificationToken);
        const url = `${api}/auth/confirm/${verificationToken}`;
        try {
            await this.mailerService.sendMail({
                to: user.Email,
                subject: 'Account Verification',
                template: './confirmation',
                context: {
                    name: user.FullName,
                    url,
                },
            });
        }
        catch (e) {
            throw new unauthorized_exception_1.PasswordUpdateException(e.message);
        }
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        auth_service_1.AuthService])
], EmailService);
//# sourceMappingURL=email.service.js.map