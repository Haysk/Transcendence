import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PongComponent } from './pong/pong.component';
import { HeaderComponent } from './header/header.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { ShowRoomComponent } from './show-room/show-room.component';
import { VipRoomComponent } from './vip-room/vip-room.component';
import { BlocChatComponent } from './bloc-chat/bloc-chat.component';
import { RestRoomComponent } from './rest-room/rest-room.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { DirectChatComponent } from './direct-chat/direct-chat.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { SalonComponent } from './salon/salon.component';
import { ButtonV2Component } from './widgets/button-v2/button-v2.component';
import { UserInSalonComponent } from './widgets/user-in-salon/user-in-salon.component';
import { ButtonV3Component } from './widgets/button-v3/button-v3.component';
import { CreateSalonComponent } from './widgets/create-salon/create-salon.component';
import { SalonAvailableComponent } from './widgets/salon-available/salon-available.component';
import { PongPlayerComponent } from './pong-player/pong-player.component';
import { PongBallComponent } from './pong-ball/pong-ball.component';
import { PongGameComponent } from './pong-game/pong-game.component';
import { PlayerPongComponent } from './widgets/player-pong/player-pong.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PongComponent,
    HeaderComponent,
    GameRoomComponent,
    ShowRoomComponent,
    VipRoomComponent,
    BlocChatComponent,
    RestRoomComponent,
    LoginComponent,
    ChatComponent,
    DirectChatComponent,
    ChatHistoryComponent,
    SelectUserComponent,
    SalonComponent,
    ButtonV2Component,
    UserInSalonComponent,
    ButtonV3Component,
    CreateSalonComponent,
    SalonAvailableComponent,
    PongPlayerComponent,
    PongBallComponent,
    PongGameComponent,
    PlayerPongComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
