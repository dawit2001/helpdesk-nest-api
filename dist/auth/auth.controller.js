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
const email_service_1 = require("../email/email.service");
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
const socket_gateway_1 = require("../socket/socket.gateway");
const api = process.env.NEST_ENV === 'PRODUCTION'
    ? 'https://kns-support.vercel.app'
    : 'http://localhost:3000';
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, emailService, socketGateway) {
        this.authService = authService;
        this.emailService = emailService;
        this.socketGateway = socketGateway;
        this.setAccessTokenCookie = (res, AccessToken, RefreshToken) => {
            res.cookie('access_token', AccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 15 * 60 * 1000),
                path: '/',
            });
            res.cookie('refresh_token', RefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 2 * 30 * 24 * 60 * 60 * 1000),
                path: '/',
            });
        };
        this.removeAccessToken = (res) => {
            res.cookie('access_token', '', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(0),
                path: '/',
            });
            res.cookie('refresh_token', '', {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(0),
                path: '/',
            });
        };
    }
    async signup(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        const EmailToken = await this.authService.generateEmailToken({
            sub: req.body.Id,
            username: req.body.UserName,
        });
        try {
            const user = await this.authService.SignUp(req.body);
            await this.emailService.sendVerificationEmail(req.body, EmailToken);
            const { Id, FullName, Email, UserName, UserType, Image, WorkingPhone, MobilePhone, Verified, } = user;
            res.status(200).send({
                Id,
                FullName,
                Email,
                UserName,
                UserType,
                Image,
                WorkingPhone,
                MobilePhone,
                Verified,
            });
        }
        catch (e) {
            throw new unauthorized_exception_1.PasswordUpdateException(e.message);
        }
    }
    async verifyEmail(token, req, res) {
        try {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            const decodedToken = await this.authService.verifyEmailtoken(token);
            if (!decodedToken)
                throw new unauthorized_exception_1.PasswordUpdateException('Invalid token...');
            const isTokenExpired = this.isTokenExpired(decodedToken.exp);
            if (isTokenExpired)
                throw new unauthorized_exception_1.PasswordUpdateException('Token expired...');
            console.log(decodedToken);
            const user = await this.authService.verifyedUser(decodedToken.sub);
            const payload = { sub: user.Id, userName: user.UserName };
            const AccessToken = await this.authService.generateToken(payload);
            const RefreshToken = await this.authService.generateRefreshToken(payload);
            this.socketGateway.server.emit('emailConfirmed', [
                user.Id,
                AccessToken,
                RefreshToken,
            ]);
            this.setAccessTokenCookie(res, AccessToken, RefreshToken);
            res.redirect(`${api}`);
        }
        catch (e) {
            throw new unauthorized_exception_1.PasswordUpdateException(e.message);
        }
    }
    async signin(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        const { user, AccessToken, RefreshToken } = await this.authService.SignIn(req.body);
        if (user) {
            const EmailToken = await this.authService.generateEmailToken({
                sub: user.Id,
                username: user.UserName,
            });
            try {
                await this.emailService.sendVerificationEmail(req.body, EmailToken);
                const { Id, FullName, Email, UserName, UserType, Image, WorkingPhone, MobilePhone, Verified, } = user;
                const User = {
                    Id,
                    FullName,
                    Email,
                    UserName,
                    UserType,
                    Image,
                    WorkingPhone,
                    MobilePhone,
                    Verified,
                };
                return { User, AccessToken, RefreshToken };
            }
            catch (e) {
                throw new unauthorized_exception_1.PasswordUpdateException(e.message);
            }
        }
        else {
            this.setAccessTokenCookie(res, AccessToken, RefreshToken);
            res.send('successfully loggedin');
        }
    }
    async signinwithGoogle(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        const { user, AccessToken, RefreshToken } = await this.authService.signInWithGoogle(req.body);
        console.log(user);
        if (!user) {
            console.log('user not found');
            const EmailToken = await this.authService.generateEmailToken({
                sub: req.body.Id,
                username: req.body.UserName,
            });
            try {
                const user = await this.authService.SignUp(req.body);
                await this.emailService.sendVerificationEmail(req.body, EmailToken);
                const { Id, FullName, Email, UserName, UserType, Image, WorkingPhone, MobilePhone, Verified, } = user;
                const User = {
                    Id,
                    FullName,
                    Email,
                    UserName,
                    UserType,
                    Image,
                    WorkingPhone,
                    MobilePhone,
                    Verified,
                };
                return { User };
            }
            catch (e) {
                throw new unauthorized_exception_1.PasswordUpdateException(e.message);
            }
        }
        if (user && !user.Verified) {
            console.log(user);
            const EmailToken = await this.authService.generateEmailToken({
                sub: user.Id,
                username: user.UserName,
            });
            try {
                await this.emailService.sendVerificationEmail(user, EmailToken);
                const { Id, FullName, Email, UserName, UserType, Image, WorkingPhone, MobilePhone, Verified, } = user;
                const User = {
                    Id,
                    FullName,
                    Email,
                    UserName,
                    UserType,
                    Image,
                    WorkingPhone,
                    MobilePhone,
                    Verified,
                };
                return { User };
            }
            catch (e) {
                throw new unauthorized_exception_1.PasswordUpdateException(e.message);
            }
        }
        else {
            this.setAccessTokenCookie(res, AccessToken, RefreshToken);
            res.send({ status: 'ok' });
        }
    }
    async signinwithGoogleAgent(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        const { AccessToken, RefreshToken } = await this.authService.signInWithGoogleAgent(req.body);
        this.setAccessTokenCookie(res, AccessToken, RefreshToken);
        res.send({ status: 'ok' });
    }
    async signout(req, res) {
        console.log(req.cookies['access_token']);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        this.removeAccessToken(res);
        res.send('user logged out');
    }
    async getProfile(req) {
        const { userId } = req.user;
        console.log(req.user);
        const { Id, FullName, Email, UserName, UserType, Image, WorkingPhone, MobilePhone, Verified, } = await this.authService.UserProfile({ userId });
        return {
            Id,
            FullName,
            Email,
            UserName,
            UserType,
            Image,
            WorkingPhone,
            MobilePhone,
            Verified,
        };
    }
    isTokenExpired(expirationTimestamp) {
        const now = Date.now() / 1000;
        return now >= expirationTimestamp;
    }
    async refreshAccessToken(req, res) {
        if (!req.cookies['refresh_token'])
            throw new common_1.UnauthorizedException('User not authorized...');
        try {
            const decodedToken = this.authService.validateToken(req.cookies['refresh_token']);
            if (!decodedToken || this.isTokenExpired(decodedToken.exp))
                throw new common_1.UnauthorizedException('User not authorized...');
            const userId = decodedToken.sub;
            const user = await this.authService.UserProfile({ userId });
            if (!user)
                throw new common_1.UnauthorizedException('User not authorized...');
            const payload = { sub: user.Id, username: user.UserName };
            const AccessToken = await this.authService.generateToken(payload);
            res.cookie('access_token', AccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                path: '/',
            });
            const { Id, FullName, Email, UserName, UserType, Image, WorkingPhone, MobilePhone, } = user;
            res.send({
                Id,
                FullName,
                Email,
                UserName,
                UserType,
                Image,
                WorkingPhone,
                MobilePhone,
            });
        }
        catch (e) {
            throw new common_1.UnauthorizedException('User is not authorized .....');
        }
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
    (0, common_1.Get)('confirm/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
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
    (0, common_1.Post)('googleAuth/agent'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinwithGoogleAgent", null);
__decorate([
    (0, common_1.Get)('signout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signout", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JWTGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAccessToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        email_service_1.EmailService,
        socket_gateway_1.SocketGateway])
], AuthController);
//# sourceMappingURL=auth.controller.js.map