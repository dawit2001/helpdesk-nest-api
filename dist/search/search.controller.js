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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
let SearchController = exports.SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async GetSearchQuery(queryType, query) {
        if (queryType === 'all') {
            const Tickets = await this.searchService.searchTicket(query);
            const Article = await this.searchService.searchArticle(query);
            const Ticket = Tickets.map((ticket) => {
                const { Id, Type, Priority, Subject, Content, UserId, CreatedAt, UpdatedAt, } = ticket;
                const tickets = {
                    Id,
                    Type,
                    Priority,
                    Subject,
                    Content,
                    UserId,
                    CreatedAt,
                    UpdatedAt,
                };
                return tickets;
            });
            const article = [];
            return { Ticket, article };
        }
        if (queryType === 'tickets') {
            const Tickets = await this.searchService.searchTicket(query);
            const Ticket = Tickets.map((ticket) => {
                const { Id, Type, Priority, Subject, Content, UserId, CreatedAt, UpdatedAt, } = ticket;
                const tickets = {
                    Id,
                    Type,
                    Priority,
                    Subject,
                    Content,
                    UserId,
                    CreatedAt,
                    UpdatedAt,
                };
                return tickets;
            });
            const Article = [];
            return { Ticket, Article };
        }
        if (queryType === 'articles') {
            const Article = await this.searchService.searchArticle(query);
            const Ticket = [];
            return { Ticket, Article };
        }
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "GetSearchQuery", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map