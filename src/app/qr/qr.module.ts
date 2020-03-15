import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanComponent } from './scan/scan.component';
import { ShowComponent } from './show/show.component';



@NgModule({
  declarations: [ScanComponent, ShowComponent],
  imports: [
    CommonModule
  ]
})
export class QrModule { }
