export declare class SignUpDto {
    Id: string;
    FullName: string | null;
    Password: string;
    UserName: string;
    Email: string;
    Image: string | null;
    About: string | null;
    UserType: string;
    WorkingPhone: string | null;
    MobilePhone: string | null;
    CreatedDate: Date | null;
    Verified: boolean;
}
export declare class SignInDto {
    Email: any;
    Password: string;
}
export declare class UpdateUserDto {
    FullName: string | null;
    UserName: string | null;
    Image: string | null;
    WorkingPhone: string | null;
    MobilePhone: string | null;
}
export declare class UpdatePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class GoogleUserDto {
    Id: string;
    FullName: string | null;
    Password: string;
    UserName: string;
    Email: string;
    Image: string | null;
    UserType: string;
    WorkingPhone: string | null;
    MobilePhone: string | null;
}
