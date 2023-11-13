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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImapService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_imap_1 = __importDefault(require("node-imap"));
const mailparser_1 = require("mailparser");
const uuid_1 = require("uuid");
const ticket_service_1 = require("../ticket/ticket.service");
const firebase_service_1 = require("../firebase/firebase.service");
const user_service_1 = require("../user/user.service");
let ImapService = exports.ImapService = class ImapService {
    constructor(configService, ticketService, firebaseService, userService) {
        this.configService = configService;
        this.ticketService = ticketService;
        this.firebaseService = firebaseService;
        this.userService = userService;
        this.email_array = [];
        console.log('email ticket page loaded');
        this.connectToImap();
    }
    connectToImap() {
        this.client = new node_imap_1.default({
            user: this.configService.get('EMAIL_USER'),
            password: this.configService.get('EMAIL_PASS'),
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            keepalive: true,
        });
        this.client.once('ready', () => {
            this.readNewEmails();
        });
        this.client.once('error', (err) => {
            console.log(err);
        });
        this.client.connect();
    }
    readNewEmails() {
        let email_buffer = [];
        try {
            this.client.openBox('INBOX', false, (openBoxErr, mailbox) => {
                if (openBoxErr) {
                    this.client.end();
                    return;
                }
                this.client.on('mail', () => {
                    const searchCriteria = ['UNSEEN'];
                    const fetchOptions = {
                        bodies: '',
                        markSeen: true,
                        struct: true,
                    };
                    this.client.search(searchCriteria, (error, results) => {
                        if (!results || !results.length) {
                            console.log("The server didn't find  emails matching the specified criteria");
                            return;
                        }
                        const fetch = this.client.fetch(results, fetchOptions);
                        fetch.on('message', (msg, seqno) => {
                            var prefix = '(#' + seqno + ') ';
                            msg.on('body', (stream, info) => {
                                var buffer = '', count = 0;
                                stream.on('data', (chunk) => {
                                    count += chunk.length;
                                    buffer += chunk.toString('utf8');
                                });
                                stream.once('end', function () {
                                    email_buffer.push(buffer);
                                });
                            });
                            msg.once('end', function () { });
                        });
                        fetch.once('end', async () => {
                            const parsedEmails = email_buffer.map(async (buffer, i) => {
                                var dataheader = node_imap_1.default.parseHeader(buffer);
                                if (Object.keys(dataheader).length > 0) {
                                    let emails_data = {
                                        date: dataheader.date[0],
                                        subject: dataheader.subject[0],
                                        from: dataheader.from[0],
                                        to: dataheader.to[0],
                                        content: (await (0, mailparser_1.simpleParser)(buffer)).html,
                                        attachment: (await (0, mailparser_1.simpleParser)(buffer)).attachments,
                                    };
                                    return emails_data;
                                }
                            });
                            await this.addEmailTickets(await Promise.all(parsedEmails));
                        });
                    });
                });
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async addEmailTickets(emails) {
        const lastEmail = emails.length - 1;
        const email = emails[lastEmail];
        const content = email.content
            .replace('<div dir="ltr">', '<p>')
            .replace('</div>', '</p>');
        const emailRegex = /<([^>]+)>/;
        const nameRegex = /^([^<]*)/;
        const date = new Date(Date.parse(email.date));
        const TicketId = parseInt((0, uuid_1.v1)().replace(/-/g, ''), 16)
            .toString()
            .replace('.', '')
            .replace('e+', '');
        const name = email.from.match(nameRegex)
            ? email.from.match(nameRegex)[1]
            : null;
        const Email = email.from.match(emailRegex)
            ? email.from.match(emailRegex)[1]
            : null;
        let userId = null;
        if (Email) {
            const Userdata = {
                Id: parseInt((0, uuid_1.v1)().replace(/-/g, ''), 16)
                    .toString()
                    .replace('.', '')
                    .replace('e+', ''),
                FullName: name,
                Password: ' ',
                UserName: name,
                Email: Email,
                Image: null,
                About: null,
                UserType: 'Customer',
                WorkingPhone: null,
                MobilePhone: null,
                CreatedDate: date,
                Verified: false,
            };
            const user = (await this.userService.Login({ Email }))
                ? await this.userService.Login({ Email })
                : await this.userService.EmailUser(Userdata);
            if (user) {
                userId = user.Id;
            }
        }
        const TicketData = {
            Id: TicketId,
            UserId: userId,
            Type: 'Ask Question',
            ReportedVia: 'Email',
            Email: Email,
            Priority: 'Medium',
            Subject: email.subject,
            Content: content,
            FirstResponseDue: new Date(Date.parse(date.toISOString()) + 7 * 24 * 60 * 60 * 1000),
            ResolutionDue: new Date(Date.parse(date.toISOString()) + 14 * 24 * 60 * 60 * 1000),
            CreatedAt: date,
            UpdatedAt: null,
            Status: 'Open',
        };
        const ticket = await this.ticketService.newTicket(TicketData);
        console.log(ticket);
        if (email.attachment.length > 0) {
            try {
                const url = await this.firebaseService.uploadAttachments(email.attachment);
                if (url && url.length > 0) {
                    email.attachment.map(async (attach, i) => {
                        const attachment = {
                            Id: parseInt((0, uuid_1.v1)().replace(/-/g, ''), 16)
                                .toString()
                                .replace('.', '')
                                .replace('e+', ''),
                            FileName: attach.filename,
                            FilePath: url[i].toString(),
                            Size: attach.size,
                            Mimi_Type: attach.contentType,
                            TicketId: TicketId,
                            ReplyId: null,
                            CannedResponseId: null,
                            Createdat: date,
                            CreatedBy: null,
                        };
                        const file = await this.ticketService.newAttachment(attachment);
                        console.log(file);
                    });
                }
            }
            catch (e) { }
        }
    }
};
exports.ImapService = ImapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        ticket_service_1.TicketService,
        firebase_service_1.FirebaseService,
        user_service_1.UserService])
], ImapService);
//# sourceMappingURL=imap.service.js.map