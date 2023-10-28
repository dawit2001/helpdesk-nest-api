export declare class newTicketDto {
    Id: string;
    UserId?: string;
    Type: string;
    ReportedVia: string;
    Email: string;
    Priority: string;
    Subject: string;
    Content: string;
    FirstResponseDue: Date;
    ResolutionDue: Date;
    CreatedAt: Date;
    UpdatedAt?: Date;
    Status: string;
}
export declare class AttachmentDto {
    Id: string;
    FileName: string;
    FilePath: string;
    Size: number;
    Mimi_Type: string;
    TicketId: string;
    ReplyId?: string;
    CannedResponseId?: string;
    Createdat: Date;
    CreatedBy?: string;
}
