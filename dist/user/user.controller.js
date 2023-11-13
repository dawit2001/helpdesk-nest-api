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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
let UserController = exports.UserController = class UserController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async getUser(userId) {
        const user = await this.UserService.contact(userId);
        console.log(user);
        if (user) {
            const { Id, FullName, Email, UserName, Image, UserType, WorkingPhone, MobilePhone, Verified, } = user;
            return {
                Id,
                FullName,
                Email,
                UserName,
                Image,
                UserType,
                WorkingPhone,
                MobilePhone,
                Verified,
            };
        }
    }
    async updateProfile(userId, updateUserDto) {
        const user = await this.UserService.updateUser(userId, updateUserDto);
        if (user) {
            const { Id, FullName, Email, UserName, Image, UserType, WorkingPhone, MobilePhone, Verified, } = user;
            return {
                Id,
                FullName,
                Email,
                UserName,
                Image,
                UserType,
                WorkingPhone,
                MobilePhone,
                Verified,
            };
        }
    }
    async updatePassword(userId, UpdatePassword) {
        const user = await this.UserService.updatePassword(userId, UpdatePassword);
        const { Id, FullName, Email, UserName, Image, UserType, WorkingPhone, MobilePhone, } = user;
        return {
            Id,
            FullName,
            Email,
            UserName,
            Image,
            UserType,
            WorkingPhone,
            MobilePhone,
        };
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('updatePassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map