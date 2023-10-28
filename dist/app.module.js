"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_controller_1 = require("./user/user.controller");
const user_module_1 = require("./user/user.module");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const user_service_1 = require("./user/user.service");
const passport_1 = require("@nestjs/passport");
const ticket_module_1 = require("./ticket/ticket.module");
const search_service_1 = require("./search/search.service");
const search_module_1 = require("./search/search.module");
const email_service_1 = require("./email/email.service");
const email_module_1 = require("./email/email.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) { }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, auth_module_1.AuthModule, passport_1.PassportModule, ticket_module_1.TicketModule, search_module_1.SearchModule, email_module_1.EmailModule],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, auth_service_1.AuthService, user_service_1.UserService, search_service_1.SearchService, email_service_1.EmailService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map