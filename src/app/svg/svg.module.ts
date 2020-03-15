import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TccgLogoComponent } from './tccg-logo/tccg-logo.component';

@NgModule({
  declarations: [TccgLogoComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TccgLogoComponent
  ]
})
export class SvgModule { }
