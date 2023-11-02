import { EmailService } from './email.service';
import { AuthService } from 'src/auth/auth.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService, authService: AuthService);
}
