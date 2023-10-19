import { Attachement, Prisma, Tickets } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TicketService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserTickets(Id: string): Promise<Tickets[] | null>;
    newTicket(data: Prisma.TicketsCreateInput): Promise<Tickets>;
    fetchAttachment(): Promise<Attachement[]>;
    newAttachment(data: Prisma.AttachementCreateInput): Promise<Attachement>;
}
