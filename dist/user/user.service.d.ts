import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users } from '@prisma/client';
import { UpdatePasswordDto } from './user.dto';
export declare class UserService {
    private Prisma;
    constructor(Prisma: PrismaService);
    User({ Id }: Prisma.UsersWhereUniqueInput): Promise<Users | null>;
    contact(Id: string): Promise<Users | null>;
    EmailUser(data: Prisma.UsersCreateInput): Promise<Users | null>;
    LoginAgent(where: Prisma.UsersWhereUniqueInput): Promise<Users | null>;
    Login({ Email }: Prisma.UsersWhereUniqueInput): Promise<Users | null>;
    SignUP(data: Prisma.UsersCreateInput): Promise<Users | null>;
    updateUser(Id: string, data: Prisma.UsersUpdateInput): Promise<Users>;
    updatePassword(Id: string, data: UpdatePasswordDto): Promise<Users>;
}
