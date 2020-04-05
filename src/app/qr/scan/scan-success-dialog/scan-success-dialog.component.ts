import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-scan-success-dialog',
  templateUrl: './scan-success-dialog.component.html',
  styleUrls: ['./scan-success-dialog.component.scss']
})
export class ScanSuccessDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ScanSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
