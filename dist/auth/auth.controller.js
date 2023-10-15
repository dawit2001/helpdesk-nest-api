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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("./auth.guard");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.setAccessTokenCookie = (res, AccessToken) => {
            res.cookie('access_token', AccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                path: '/',
            });
        };
    }
    async signup(req, res) {
        const AccessToken = await this.authService.SignUp(req.body);
        res.clearCookie('access_token');
        this.setAccessTokenCookie(res, AccessToken);
        res.send('successfully registerd');
    }
    async signin(req, res) {
        const AccessToken = await this.authService.SignIn(req.body);
        res.clearCookie('access_token');
        this.setAccessTokenCookie(res, AccessToken);
        res.send('successfully loggedin');
    }
    async signinwithGoogle(req, res) {
        const AccessToken = await this.authService.signInWithGoogle(req.body);
        res.clearCookie('access_token');
        this.setAccessTokenCookie(res, AccessToken);
        res.send({ status: 'ok' });
    }
    async signout(res) {
        res.clearCookie('access_token');
        res.send('user logged out');
    }
    async getProfile(req) {
        const { userId } = req.user;
        const { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone } = await this.authService.UserProfile({ userId });
        return { Id, FullName, Email, UserName, Image, WorkingPhone, MobilePhone };
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('googleAuth'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinwithGoogle", null);
__decorate([
    (0, common_1.Get)('signout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signout", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JWTGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map