import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
import { Request as request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignUpDto): Promise<{
        Id: string;
        FullName: string;
        UserName: string;
        Image: string;
        WorkingPhone: string;
        MobilePhone: string;
    }>;
    signin(signin: SignInDto): Promise<{
        AccessToken: string;
    }>;
    signinwithGoogle(req: request, res: Response): Promise<void>;
    signout(res: Response): Promise<void>;
    getProfile(req: any): Promise<{
        Id: string;
        FullName: string;
        Email: string;
        UserName: string;
        Image: string;
        WorkingPhone: string;
        MobilePhone: string;
    }>;
}
