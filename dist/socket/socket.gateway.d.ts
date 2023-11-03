import { Server, Socket } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    private client;
    emailConfirmed(client: Socket, userId: string, AccessToken: string, RefreshToken: string): Promise<void>;
}
