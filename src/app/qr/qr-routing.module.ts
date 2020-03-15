import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScanComponent } from './scan/scan.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'qr/scan', component: ScanComponent },
  { path: 'qr/show', component: ShowComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrRoutingModule { }
