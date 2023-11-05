import { AuthService } from './auth.service';
import { Request as request, Response } from 'express';
import { EmailService } from 'src/email/email.service';
import { SocketGateway } from 'src/socket/socket.gateway';
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    private readonly socketGateway;
    constructor(authService: AuthService, emailService: EmailService, socketGateway: SocketGateway);
    private setAccessTokenCookie;
    private removeAccessToken;
    signup(req: request, res: Response): Promise<void>;
    verifyEmail(token: string, req: request, res: Response): Promise<void>;
    signin(req: request, res: Response): Promise<{
        User: {
            Id: string;
            FullName: string;
            Email: string;
            UserName: string;
            UserType: string;
            Image: string;
            WorkingPhone: string;
            MobilePhone: string;
            Verified: boolean;
        };
        AccessToken: string;
        RefreshToken: string;
    }>;
    signinwithGoogle(req: request, res: Response): Promise<{
        User: {
            Id: string;
            FullName: string;
            Email: string;
            UserName: string;
            UserType: string;
            Image: string;
            WorkingPhone: string;
            MobilePhone: string;
            Verified: boolean;
        };
    }>;
    signinwithGoogleAgent(req: request, res: Response): Promise<void>;
    signout(req: request, res: Response): Promise<void>;
    getProfile(req: any): Promise<{
        Id: string;
        FullName: string;
        Email: string;
        UserName: string;
        UserType: string;
        Image: string;
        WorkingPhone: string;
        MobilePhone: string;
        Verified: boolean;
    }>;
    private isTokenExpired;
    refreshAccessToken(req: request, res: Response): Promise<void>;
}
