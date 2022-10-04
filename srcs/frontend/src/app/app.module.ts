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
<<<<<<< HEAD
import { ChatComponent } from './chat/chat.component';
import { DirectChatComponent } from './direct-chat/direct-chat.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { ChannelRoomComponent } from './channel/channel-room/channel-room.component';
=======
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
>>>>>>> origin/OAut

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TechnoAddComponent,
    TechnoListComponent,
    TechnoDetailsComponent,
    PongComponent,
<<<<<<< HEAD
    ChatComponent,
    DirectChatComponent,
    ChatHistoryComponent,
    SelectUserComponent,
    ChannelRoomComponent
=======
	AuthComponent,
 HeaderComponent
>>>>>>> origin/OAut
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
