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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TicketService = exports.TicketService = class TicketService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserTickets(Id) {
        console.log(Id);
        const Tickets = await this.prisma.tickets.findMany({
            where: {
                UserId: Id,
            },
            orderBy: {
                CreatedAt: 'desc',
            },
        });
        if (!Tickets) {
            return null;
        }
        return Tickets;
    }
    async newTicket(data) {
        const Ticket = await this.prisma.tickets.create({
            data,
        });
        console.log(Ticket);
        return Ticket;
    }
    async fetchAttachment() {
        const Attachement = await this.prisma.attachement.findMany();
        return Attachement;
    }
    async newAttachment(data) {
        const Attachment = await this.prisma.attachement.create({
            data,
        });
        return Attachment;
    }
};
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketService);
//# sourceMappingURL=ticket.service.js.map