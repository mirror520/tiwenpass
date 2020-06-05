import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserRoutingModule } from './user-routing.module';
import { SvgModule } from '../svg/svg.module';

import { LoginComponent } from './login/login.component';
import { DuplicateVerificationDialogComponent } from './login/duplicate-verification-dialog/duplicate-verification-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    DuplicateVerificationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    UserRoutingModule,
    SvgModule,
  ],
})
export class UserModule { }
