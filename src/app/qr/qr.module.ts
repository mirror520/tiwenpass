import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrRoutingModule } from './qr-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ScanComponent } from './scan/scan.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [ScanComponent, ShowComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ZXingScannerModule,
    QrRoutingModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
  ]
})
export class QrModule { }
