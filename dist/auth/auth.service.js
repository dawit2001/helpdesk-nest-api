"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = __importStar(require("bcrypt"));
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
        return { AccessToken: await this.generateToken(payload) };
    }
    async validatePassword(Password, HashPassword) {
        return await bcrypt.compare(Password, HashPassword);
    }
    async SignUp(signUpDto) {
        const user = await this.UserService.SignUP(signUpDto);
        return user;
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