import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
export declare class AuthService {
    private readonly JWTService;
    private readonly UserService;
    constructor(JWTService: JwtService, UserService: UserService);
    generateEmailToken(payload: any): Promise<string>;
    generateToken(payload: any): Promise<string>;
    generateRefreshToken(payload: any): Promise<string>;
    validateToken(token: string): any;
    verifyEmailtoken(token: string): any;
    SignIn({ Email, Password }: SignInDto): Promise<{
        user: {
            Id: string;
            FullName: string;
            UserName: string;
            Email: string;
            Password: string;
            Image: string;
            UserType: string;
            About: string;
            CreatedDate: Date;
            WorkingPhone: string;
            MobilePhone: string;
            Verified: boolean;
        };
        AccessToken: string;
        RefreshToken: string;
    }>;
    private validatePassword;
    SignUp(signUpDto: SignUpDto): Promise<{
        Id: string;
        FullName: string;
        UserName: string;
        Email: string;
        Password: string;
        Image: string;
        UserType: string;
        About: string;
        CreatedDate: Date;
        WorkingPhone: string;
        MobilePhone: string;
        Verified: boolean;
    }>;
    verifyedUser(Id: string): Promise<{
        Id: string;
        FullName: string;
        UserName: string;
        Email: string;
        Password: string;
        Image: string;
        UserType: string;
        About: string;
        CreatedDate: Date;
        WorkingPhone: string;
        MobilePhone: string;
        Verified: boolean;
    }>;
    signInWithGoogle(signupDto: SignUpDto): Promise<{
        user: {
            Id: string;
            FullName: string;
            UserName: string;
            Email: string;
            Password: string;
            Image: string;
            UserType: string;
            About: string;
            CreatedDate: Date;
            WorkingPhone: string;
            MobilePhone: string;
            Verified: boolean;
        };
        AccessToken: string;
        RefreshToken: string;
    }>;
    signInWithGoogleAgent(signupDto: SignUpDto): Promise<{
        AccessToken: string;
        RefreshToken: string;
    }>;
    UserProfile({ userId }: any): Promise<{
        Id: string;
        FullName: string;
        UserName: string;
        Email: string;
        Password: string;
        Image: string;
        UserType: string;
        About: string;
        CreatedDate: Date;
        WorkingPhone: string;
        MobilePhone: string;
        Verified: boolean;
    }>;
}
