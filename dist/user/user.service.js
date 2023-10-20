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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const unauthorized_exception_1 = require("../exception/unauthorized.exception");
let UserService = exports.UserService = class UserService {
    constructor(Prisma) {
        this.Prisma = Prisma;
    }
    async User({ Id }) {
        const user = this.Prisma.users.findUnique({
            where: {
                Id,
            },
        });
        return user;
    }
    async LoginAgent(where) {
        const user = await this.Prisma.users.findUnique({
            where: where,
        });
        return user;
    }
    async Login({ Email }) {
        const user = await this.Prisma.users.findUnique({
            where: {
                Email,
            },
        });
        if (!user)
            return null;
        return user;
    }
    async SignUP(data) {
        let Password;
        if (data.Password) {
            try {
                Password = await bcrypt_1.default.hash(data.Password, 10);
            }
            catch (e) { }
        }
        else
            Password = ' ';
        const user = await this.Prisma.users.create({
            data: {
                ...data,
                Password,
            },
        });
        return user;
    }
    async updateUser(Id, data) {
        const profile = await this.Prisma.users.update({
            where: { Id },
            data: data,
        });
        return profile;
    }
    async updatePassword(Id, data) {
        let user = await this.User({ Id });
        let result;
        if (!user)
            throw new unauthorized_exception_1.PasswordUpdateException("User Doesn't exist");
        if (data.newPassword && user.Password) {
            try {
                result = await bcrypt_1.default.compare(data.currentPassword, user.Password);
            }
            catch (e) {
                throw new unauthorized_exception_1.PasswordUpdateException('something wrong . Please try again ');
            }
            if (result) {
                const Password = await bcrypt_1.default.hash(data.newPassword, 10);
                user = await this.Prisma.users.update({
                    where: { Id },
                    data: {
                        Password,
                    },
                });
            }
            else
                throw new unauthorized_exception_1.PasswordUpdateException('Incorrect Password');
        }
        return user;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map