import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly UserService;
    constructor(UserService: UserService);
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<{
        Id: string;
        FullName: string;
        Email: string;
        UserName: string;
        Image: string;
        UserType: string;
        WorkingPhone: string;
        MobilePhone: string;
    }>;
}
