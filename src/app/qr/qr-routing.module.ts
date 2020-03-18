import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { ScanComponent } from './scan/scan.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'qr/scan', component: ScanComponent, canActivate: [AuthGuard] },
  { path: 'qr/show', component: ShowComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrRoutingModule { }
