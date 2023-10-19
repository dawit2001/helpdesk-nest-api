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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_service_1 = require("./ticket.service");
const Ticket_dto_1 = require("./Ticket.dto");
let TicketController = exports.TicketController = class TicketController {
    constructor(TicketService) {
        this.TicketService = TicketService;
    }
    async getTickets(userId) {
        console.log(userId);
        const Tickets = await this.TicketService.getUserTickets(userId);
        console.log(Tickets);
        return Tickets.map((ticket) => {
            const { Id, Type, Priority, Subject, Content, UserId, CreatedAt, UpdatedAt, } = ticket;
            return {
                Id,
                Type,
                Priority,
                Subject,
                Content,
                UserId,
                CreatedAt,
                UpdatedAt,
            };
        });
    }
    async newTicket(newTicketDto) {
        const Ticket = await this.TicketService.newTicket(newTicketDto);
        const { Id, Type: IssueType, Priority, Subject, Content: Description, UserId, CreatedAt, UpdatedAt, } = Ticket;
        return {
            Id,
            IssueType,
            Priority,
            Subject,
            Description,
            UserId,
            CreatedAt,
            UpdatedAt,
        };
    }
    async fetchAttachments() {
        const attachement = await this.TicketService.fetchAttachment();
        return attachement.map((attach) => {
            const { Id, FileName, FilePath, Size, Mimi_Type, TicketId, Createdat, CreatedBy, } = attach;
            return {
                Id,
                FileName,
                FilePath,
                Size,
                Mimi_Type,
                TicketId,
                Createdat,
                CreatedBy,
            };
        });
    }
    async newAttachment(attachmentDto) {
        const attachement = await this.TicketService.newAttachment(attachmentDto);
        const { Id, FileName, FilePath, Size, Mimi_Type, TicketId, Createdat, CreatedBy, } = attachement;
        return {
            Id,
            FileName,
            FilePath,
            Size,
            Mimi_Type,
            TicketId,
            Createdat,
            CreatedBy,
        };
    }
};
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTickets", null);
__decorate([
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Ticket_dto_1.newTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "newTicket", null);
__decorate([
    (0, common_1.Get)('attachment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "fetchAttachments", null);
__decorate([
    (0, common_1.Post)('attachment/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Ticket_dto_1.AttachmentDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "newAttachment", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)('ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map