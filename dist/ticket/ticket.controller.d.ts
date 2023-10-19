import { TicketService } from './ticket.service';
import { AttachmentDto, newTicketDto } from './Ticket.dto';
export declare class TicketController {
    private readonly TicketService;
    constructor(TicketService: TicketService);
    getTickets(userId: string): Promise<{
        Id: string;
        Type: string;
        Priority: string;
        Subject: string;
        Content: string;
        UserId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }[]>;
    newTicket(newTicketDto: newTicketDto): Promise<{
        Id: string;
        IssueType: string;
        Priority: string;
        Subject: string;
        Description: string;
        UserId: string;
        CreatedAt: Date;
        UpdatedAt: Date;
    }>;
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
}
