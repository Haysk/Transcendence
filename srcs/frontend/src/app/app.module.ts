import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TechnoAddComponent } from './techno-add/techno-add.component';
import { TechnoListComponent } from './techno-list/techno-list.component';
import { TechnoDetailsComponent } from './techno-details/techno-details.component';
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
import { AuthComponent } from './auth/auth.component';
import { ChannelComponent } from './channel/channel.component';
import { FriendComponent } from './friend/friend.component';
import { TestingFakeProfileComponent } from './testing-fake-profile/testing-fake-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TechnoAddComponent,
    TechnoListComponent,
    TechnoDetailsComponent,
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
    AuthComponent,
    HeaderComponent,
    ChannelComponent,
    FriendComponent,
    TestingFakeProfileComponent
  ],
  imports: [
    BrowserModule,
  
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
