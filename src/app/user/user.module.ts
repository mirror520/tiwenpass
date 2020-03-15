import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserRoutingModule } from './user-routing.module';
import { SvgModule } from '../svg/svg.module';

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    UserRoutingModule,
    SvgModule,
  ],
})
export class UserModule { }
