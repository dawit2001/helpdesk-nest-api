import { TicketService } from './ticket.service';
import { AttachmentDto, newTicketDto } from './Ticket.dto';
export declare class TicketController {
    private readonly TicketService;
    constructor(TicketService: TicketService);
    getTicket(TicketId: string): Promise<{
        Id: string;
        Type: string;
        Priority: string;
        Subject: string;
        Content: string;
        UserId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
    getTickets(userId: string, offset: string, limit: string): Promise<{
        Ticket: {
            Id: string;
            Type: string;
            Priority: string;
            Subject: string;
            Content: string;
            UserId: string;
            CreatedAt: Date;
            UpdatedAt: Date;
            Status: string;
        }[];
        count: number;
    }>;
    newTicket(newTicketDto: newTicketDto): Promise<{
        Id: string;
        IssueType: string;
        Priority: string;
        Subject: string;
        Description: string;
        UserId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
        Status: string;
    }>;
    fetchAttachment(attachId: string): Promise<{
        Id: string;
        FileName: string;
        FilePath: string;
        Size: import("@prisma/client/runtime/library").Decimal;
        Mimi_Type: string;
        TicketId: string;
        Createdat: Date;
        CreatedBy: string;
    }[]>;
    fetchAttachments(): Promise<{
        Id: string;
        FileName: string;
        FilePath: string;
        Size: import("@prisma/client/runtime/library").Decimal;
        Mimi_Type: string;
        TicketId: string;
        Createdat: Date;
        CreatedBy: string;
    }[]>;
    newAttachment(attachmentDto: AttachmentDto): Promise<{
        Id: string;
        FileName: string;
        FilePath: string;
        Size: import("@prisma/client/runtime/library").Decimal;
        Mimi_Type: string;
        TicketId: string;
        Createdat: Date;
        CreatedBy: string;
    }>;
    deleteAttachment(attachId: string): Promise<{
        Id: string;
        FileName: string;
        FilePath: string;
        Size: import("@prisma/client/runtime/library").Decimal;
        Mimi_Type: string;
        TicketId: string;
        Createdat: Date;
        CreatedBy: string;
    }>;
    updateTicket(userId: string, updateTicket: newTicketDto): Promise<{
        Id: string;
        IssueType: string;
        Priority: string;
        Subject: string;
        Description: string;
        UserId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
    DeleteTicket(TicketId: string): Promise<{
        Id: string;
        Type: string;
        Priority: string;
        Subject: string;
        Content: string;
        UserId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
}
