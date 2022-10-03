import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PongComponent } from './pong/pong.component';
import { AuthComponent } from './auth/auth.component';
import { TechnoAddComponent } from './techno-add/techno-add.component';
import { TechnoListComponent } from './techno-list/techno-list.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { ShowRoomComponent } from './show-room/show-room.component';
import { VipRoomComponent } from './vip-room/vip-room.component';
import { RestRoomComponent } from './rest-room/rest-room.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';





const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'game-room', component: GameRoomComponent },
  { path: 'show-room', component: ShowRoomComponent },
  { path: 'vip-room', component: VipRoomComponent },
  { path: 'rest-room', component: RestRoomComponent },
  { path: 'pong', component: PongComponent },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
