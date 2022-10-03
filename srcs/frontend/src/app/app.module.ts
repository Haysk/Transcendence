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
    LoginComponent
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
