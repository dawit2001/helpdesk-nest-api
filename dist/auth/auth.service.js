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
    async generateToken(payload) {
        return this.JWTService.sign(payload);
    }
    async SignIn({ Email, Password }) {
        const user = await this.UserService.Login({ Email });
        if (!user) {
            throw new common_1.UnauthorizedException('Email not found');
        }
        if (!this.validatePassword(Password, user.Password))
            throw new common_1.UnauthorizedException('Invalid Password');
        const payload = { sub: user.Id, userName: user.UserName };
        const AccessToken = await this.generateToken(payload);
        return AccessToken;
    }
    async validatePassword(Password, HashPassword) {
        return Password.includes(HashPassword);
    }
    async SignUp(signUpDto) {
        const user = await this.UserService.SignUP(signUpDto);
        console.log(user);
        const payload = { sub: user.Id, userName: user.UserName };
        const AccessToken = await this.generateToken(payload);
        return AccessToken;
    }
    async signInWithGoogle(signupDto) {
        const { Email } = signupDto;
        let user = await this.UserService.Login({ Email });
        if (!user)
            user = await this.UserService.SignUP(signupDto);
        const payload = { sub: user.Id, userName: user.UserName };
        const AccessToken = await this.generateToken(payload);
        return AccessToken;
    }
    async signInWithGoogleAgent(signupDto) {
        const { Email, UserType } = signupDto;
        console.log(Email, UserType);
        let user = await this.UserService.LoginAgent({ Email, UserType });
        if (!user)
            throw new unauthorized_exception_1.PasswordUpdateException('This email is not registered!!!');
        const payload = { sub: user.Id, userName: user.UserName };
        const AccessToken = await this.generateToken(payload);
        return AccessToken;
    }
    async UserProfile({ userId }) {
        const { userId: Id } = { userId };
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