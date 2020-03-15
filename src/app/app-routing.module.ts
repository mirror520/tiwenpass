import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { PassGuard } from './pass.guard';
import { PassComponent } from './pass/pass.component';

const routes: Routes = [
    { path: '', component: PassComponent, canActivate: [AuthGuard] },
    { path: 'pass', component: PassComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
