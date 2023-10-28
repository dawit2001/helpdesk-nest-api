import { Attachement, Prisma, Tickets } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TicketService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getTicket(Id: string): Promise<Tickets | null>;
    getUserTickets(Id: string, offset: number, limit: number): Promise<{
        Tickets: Tickets[];
        count: number;
    } | null>;
    newTicket(data: Prisma.TicketsCreateInput): Promise<Tickets>;
    fetchSingleAttachment(Id: string): Promise<Attachement[] | null>;
    fetchAttachment(): Promise<Attachement[]>;
    newAttachment(data: Prisma.AttachementCreateInput): Promise<Attachement>;
    updateTicket(Id: string, data: Prisma.TicketsUpdateInput): Promise<{
        Id: string;
        UserId: string;
        Type: string;
        ReportedVia: string;
        Email: string;
        Priority: string;
        Subject: string;
        Content: string;
        Status: string;
        Note: string;
        DepartmentId: string;
        FirstResponseDue: Date;
        ResolutionDue: Date;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
    deleteTicket(Id: string): Promise<Tickets>;
    deleteAttachment(Id: string): Promise<Attachement>;
}
