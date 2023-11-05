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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
let AuthService = exports.AuthService = class AuthService {
    constructor(JWTService, UserService) {
        this.JWTService = JWTService;
        this.UserService = UserService;
    }
    async generateEmailToken(payload) {
        return this.JWTService.sign(payload, {
            expiresIn: '15m',
            secret: process.env.JWT_EMAIL_TOKEN,
        });
    }
    async generateToken(payload) {
        return this.JWTService.sign(payload, {
            expiresIn: '15m',
            secret: process.env.JWT_SECRET_KEY,
        });
    }
    async generateRefreshToken(payload) {
        return this.JWTService.sign(payload, {
            expiresIn: '30d',
            secret: process.env.JWT_REFRESH_SECRET_KEY,
        });
    }
    validateToken(token) {
        try {
            return this.JWTService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET_KEY,
            });
        }
        catch (e) {
            return null;
        }
    }
    verifyEmailtoken(token) {
        try {
            return this.JWTService.verify(token, {
                secret: process.env.JWT_EMAIL_TOKEN,
            });
        }
        catch (e) {
            return null;
        }
    }
    async SignIn({ Email, Password }) {
        let user = await this.UserService.Login({ Email });
        let AccessToken = null;
        let RefreshToken = null;
        if (!user) {
            throw new common_1.UnauthorizedException('Email not found.Please enter your valid email !!!');
        }
        if (user.Verified === false)
            return { user, AccessToken, RefreshToken };
        if (!this.validatePassword(Password, user.Password))
            throw new common_1.UnauthorizedException('Invalid Password');
        const payload = { sub: user.Id, userName: user.UserName };
        AccessToken = await this.generateToken(payload);
        RefreshToken = await this.generateRefreshToken(payload);
        user = null;
        return { user, AccessToken, RefreshToken };
    }
    async validatePassword(Password, HashPassword) {
        return Password.includes(HashPassword);
    }
    async SignUp(signUpDto) {
        const { Email } = signUpDto;
        let user = await this.UserService.Login({ Email });
        if (user)
            throw new unauthorized_exception_1.PasswordUpdateException('User already exist....');
        signUpDto.Verified = false;
        user = await this.UserService.SignUP(signUpDto);
        return user;
    }
    async verifyedUser(Id) {
        const unverified = await this.UserService.User({ Id });
        const verifiedUser = await this.UserService.updateUser(Id, {
            Verified: true,
        });
        return verifiedUser;
    }
    async signInWithGoogle(signupDto) {
        const { Email } = signupDto;
        let user = await this.UserService.Login({ Email });
        let AccessToken = null;
        let RefreshToken = null;
        console.log(user);
        if (user) {
            const payload = { sub: user.Id, userName: user.UserName };
            AccessToken = await this.generateToken(payload);
            RefreshToken = await this.generateRefreshToken(payload);
        }
        return { user, AccessToken, RefreshToken };
    }
    async signInWithGoogleAgent(signupDto) {
        const { Email, UserType } = signupDto;
        let user = await this.UserService.LoginAgent({ Email, UserType });
        if (!user)
            throw new unauthorized_exception_1.PasswordUpdateException('This email is not registered!!!');
        const payload = { sub: user.Id, userName: user.UserName };
        const AccessToken = await this.generateToken(payload);
        const RefreshToken = await this.generateRefreshToken(payload);
        return { AccessToken, RefreshToken };
    }
    async UserProfile(Id) {
        console.log(Id);
        const user = await this.UserService.User({ Id });
        return user;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map