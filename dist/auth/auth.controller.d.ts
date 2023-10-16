import { AuthService } from './auth.service';
import { Request as request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private setAccessTokenCookie;
    signup(req: request, res: Response): Promise<void>;
    signin(req: request, res: Response): Promise<void>;
    signinwithGoogle(req: request, res: Response): Promise<void>;
    signinwithGoogleAgent(req: request, res: Response): Promise<void>;
    signout(res: Response): Promise<void>;
    getProfile(req: any): Promise<{
        Id: string;
        FullName: string;
        Email: string;
        UserName: string;
        UserType: string;
        Image: string;
        WorkingPhone: string;
        MobilePhone: string;
    }>;
}
