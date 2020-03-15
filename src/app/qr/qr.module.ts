import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrRoutingModule } from './qr-routing.module';

import { ScanComponent } from './scan/scan.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [ScanComponent, ShowComponent],
  imports: [
    CommonModule,
    ZXingScannerModule,
    QrRoutingModule,
  ]
})
export class QrModule { }
