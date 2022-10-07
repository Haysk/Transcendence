import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: {
        origin:'*',
    }
})

export class SocketEvents{

    @WebSocketServer()
    server: Server;

    //see the connexion
    handleConnection(client: Socket){
        console.log(`Client Connect: ${client.id}`);
    }

    //see disconnection
    handleDisconnect(client: Socket){
        console.log(`Client disconnet: ${client.id}`);
    }

    //receive event
    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket){
        // send an event
        this.server.emit('message', client.id, data);
    }
}