import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { Visit } from '../../models/visit';
import { TcpassVisit } from '../../models/tcpass-visit';

@Component({
  selector: 'app-scan-success-dialog',
  templateUrl: './scan-success-dialog.component.html',
  styleUrls: ['./scan-success-dialog.component.scss']
})
export class ScanSuccessDialogComponent implements OnInit {
  closeTime: number = 0;
  isTcpass: boolean;
  visit: Visit;
  tcpass: TcpassVisit;

  constructor(
    public dialogRef: MatDialogRef<ScanSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Visit | TcpassVisit,
  ) {
    if (data instanceof Visit) {
      this.isTcpass = false;
      this.visit = data;
    } else {
      this.isTcpass = true;
      this.tcpass = data;
    }
  }

  ngOnInit() {
    this.closeTime = 1;

    timer(1000, 1000).pipe(
      takeWhile(() => this.closeTime > 0),
      map(() => this.closeTime--)
    ).subscribe({
      next: (value) => console.log(`closeTime: ${this.closeTime}`),
      error: (err) => console.error(err),
      complete: () => {
        console.log('Close Dialog')

        this.dialogRef.close();
      }
    });
  }
}
