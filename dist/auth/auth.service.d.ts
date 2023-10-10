import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto, SignUpDto } from 'src/user/user.dto';
export declare class AuthService {
    private readonly JWTService;
    readonly UserService: UserService;
    constructor(JWTService: JwtService, UserService: UserService);
    generateToken(payload: any): Promise<string>;
    SignIn({ Email, Password }: SignInDto): Promise<{
        AccessToken: string;
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
    }>;
    signInWithGoogle(signupDto: SignUpDto): Promise<string>;
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
    }>;
}
