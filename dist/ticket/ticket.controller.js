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
const user_service_1 = require("../user/user.service");
let TicketController = exports.TicketController = class TicketController {
    constructor(TicketService, UserService) {
        this.TicketService = TicketService;
        this.UserService = UserService;
    }
    async getAllTickets() {
        const Tickets = await this.TicketService.getAllTickets();
        const Ticket = Tickets.map(async (ticket) => {
            const user = ticket.UserId && (await this.UserService.contact(ticket.UserId));
            if (user)
                return { Ticket: ticket, Contact: user };
            else
                return { Ticket: ticket, Contact: ticket.Email };
        });
        console.log(await Promise.all(Ticket));
        return await Promise.all(Ticket);
    }
    async getUserTicket(TicketId) {
        const Ticket = await this.TicketService.getTicket(TicketId);
        if (Ticket) {
            const { Id, Type, Priority, Subject, Content, UserId, Status, CreatedAt, UpdatedAt, } = Ticket;
            console.log(Ticket);
            return {
                Id,
                Type,
                Priority,
                Subject,
                Content,
                UserId,
                Status,
                CreatedAt,
                UpdatedAt,
            };
        }
        return null;
    }
    async getTickets(userId, offset, limit) {
        const { Tickets, count } = await this.TicketService.getUserTickets(userId, parseInt(offset), parseInt(limit));
        const Ticket = Tickets.map((ticket) => {
            const { Id, Type, Priority, Subject, Content, UserId, CreatedAt, UpdatedAt, Status, } = ticket;
            const tickets = {
                Id,
                Type,
                Priority,
                Subject,
                Content,
                UserId,
                CreatedAt,
                UpdatedAt,
                Status,
            };
            return tickets;
        });
        return { Ticket, count };
    }
    async newTicket(newTicketDto) {
        const Ticket = await this.TicketService.newTicket(newTicketDto);
        const { Id, Type: IssueType, Priority, Subject, Content: Description, UserId, CreatedAt, UpdatedAt, Status, } = Ticket;
        return {
            Id,
            IssueType,
            Priority,
            Subject,
            Description,
            UserId,
            CreatedAt,
            UpdatedAt,
            Status,
        };
    }
    async fetchAttachment(attachId) {
        const attachement = await this.TicketService.fetchSingleAttachment(attachId);
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
    async deleteAttachment(attachId) {
        const attachement = await this.TicketService.deleteAttachment(attachId);
        console.log(attachement);
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
    async updateTicket(userId, updateTicket) {
        const Ticket = await this.TicketService.updateTicket(userId, updateTicket);
        const { Id, Type: IssueType, Priority, Subject, Content: Description, UserId, CreatedAt, Status, UpdatedAt, } = Ticket;
        return {
            Id,
            IssueType,
            Priority,
            Subject,
            Description,
            UserId,
            CreatedAt,
            Status,
            UpdatedAt,
        };
    }
    async DeleteTicket(TicketId) {
        const Ticket = await this.TicketService.deleteTicket(TicketId);
        if (Ticket) {
            const { Id, Type, Priority, Subject, Content, UserId, CreatedAt, UpdatedAt, } = Ticket;
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
        }
        return null;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getAllTickets", null);
__decorate([
    (0, common_1.Get)(':Id'),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getUserTicket", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
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
    (0, common_1.Get)('attachment/:Id'),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "fetchAttachment", null);
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
__decorate([
    (0, common_1.Delete)('attachment/:Id'),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "deleteAttachment", null);
__decorate([
    (0, common_1.Put)(':Id'),
    __param(0, (0, common_1.Param)('Id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Ticket_dto_1.newTicketDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "updateTicket", null);
__decorate([
    (0, common_1.Delete)(':Id'),
    __param(0, (0, common_1.Param)('Id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "DeleteTicket", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)('ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService,
        user_service_1.UserService])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map