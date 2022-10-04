import { OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ cors:{origin: "*"} })
export class MessageGateWay implements OnGatewayInit, OnGatewayDisconnect, OnGatewayDisconnect {
    
}