import { Tickets } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    searchTicket(query: string): Promise<Tickets[]>;
    searchArticle(query: string): Promise<any[]>;
}
