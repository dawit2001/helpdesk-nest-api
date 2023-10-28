import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    GetSearchQuery(queryType: string, query: string): Promise<{
        Ticket: {
            Id: string;
            Type: string;
            Priority: string;
            Subject: string;
            Content: string;
            UserId: string;
            CreatedAt: Date;
            UpdatedAt: Date;
        }[];
        article: any[];
        Article?: undefined;
    } | {
        Ticket: any[];
        Article: any[];
        article?: undefined;
    }>;
}
