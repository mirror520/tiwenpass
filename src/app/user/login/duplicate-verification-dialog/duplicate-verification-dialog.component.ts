import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User } from '../../model/user';

@Component({
  selector: 'app-duplicate-verification-dialog',
  templateUrl: './duplicate-verification-dialog.component.html'
})
export class DuplicateVerificationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DuplicateVerificationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }
}
