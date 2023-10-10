import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './user.dto';
export declare class UserController {
    private readonly UserService;
    constructor(UserService: UserService, PrismaService: PrismaService);
    updateProfile(updateUserDto: UpdateUserDto): Promise<void>;
}
