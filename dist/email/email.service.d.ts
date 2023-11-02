import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';
export declare class EmailService {
    private mailerService;
    private readonly authservice;
    constructor(mailerService: MailerService, authservice: AuthService);
    sendVerificationEmail(user: any, verificationToken: string): Promise<void>;
}
