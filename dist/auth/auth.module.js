"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./local.strategy");
const jwt_strategy_1 = require("./jwt.strategy ");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const user_controller_1 = require("../user/user.controller");
const user_service_1 = require("../user/user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const email_service_1 = require("../email/email.service");
const email_module_1 = require("../email/email.module");
const socket_module_1 = require("../socket/socket.module");
const socket_gateway_1 = require("../socket/socket.gateway");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET_KEY,
                signOptions: { expiresIn: '15m' },
            }),
            email_module_1.EmailModule,
            socket_module_1.SocketModule,
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            email_service_1.EmailService,
            jwt_1.JwtService,
            socket_gateway_1.SocketGateway,
        ],
        controllers: [auth_controller_1.AuthController, user_controller_1.UserController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map