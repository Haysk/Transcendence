import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PongComponent } from './pong/pong.component';
import { TechnoAddComponent } from './techno-add/techno-add.component';
import { TechnoListComponent } from './techno-list/techno-list.component';
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-techno', component: TechnoAddComponent},
  { path: 'all-technos', component: TechnoListComponent},
  { path: 'pong', component: PongComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'message', component: MessageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
