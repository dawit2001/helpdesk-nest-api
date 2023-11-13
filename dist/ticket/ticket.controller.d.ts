import { TicketService } from './ticket.service';
import { AttachmentDto, newTicketDto } from './Ticket.dto';
import { UserService } from 'src/user/user.service';
export declare class TicketController {
    private readonly TicketService;
    private readonly UserService;
    constructor(TicketService: TicketService, UserService: UserService);
    getAllTickets(): Promise<({
        Ticket: {
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
        };
        Contact: {
            Id: string;
            FullName: string;
            UserName: string;
            Email: string;
            Password: string;
            Image: string;
            UserType: string;
            About: string;
            CreatedDate: Date;
            WorkingPhone: string;
            MobilePhone: string;
            Verified: boolean;
        };
    } | {
        Ticket: {
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
        };
        Contact: string;
    })[]>;
    getUserTicket(TicketId: string): Promise<{
        Id: string;
        Type: string;
        Priority: string;
        Subject: string;
        Content: string;
        UserId: string;
        Status: string;
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
        Status: string;
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
