import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    client: Socket;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    emailConfirmed(client: Socket): Promise<void>;
    setCookie(client: Socket, data: {
        AccessToken: string;
        RefreshToken: string;
    }): Promise<void>;
}
