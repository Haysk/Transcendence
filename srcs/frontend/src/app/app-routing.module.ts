import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PongComponent } from './pong/pong.component';
import { AuthComponent } from './auth/auth.component';
import { TechnoAddComponent } from './techno-add/techno-add.component';
import { TechnoListComponent } from './techno-list/techno-list.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'add-techno', component: TechnoAddComponent},
  { path: 'all-technos', component: TechnoListComponent},
  { path: 'pong', component: PongComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
