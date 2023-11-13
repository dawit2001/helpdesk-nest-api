import { ConfigService } from '@nestjs/config';
import { TicketService } from 'src/ticket/ticket.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';
export declare class ImapService {
    private readonly configService;
    private readonly ticketService;
    private readonly firebaseService;
    private readonly userService;
    private client;
    private email_array;
    constructor(configService: ConfigService, ticketService: TicketService, firebaseService: FirebaseService, userService: UserService);
    private connectToImap;
    private readNewEmails;
    private addEmailTickets;
}
