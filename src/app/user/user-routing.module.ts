import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/guest', component: GuestLoginComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
