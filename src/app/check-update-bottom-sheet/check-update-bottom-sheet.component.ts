import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-check-update-bottom-sheet',
  templateUrl: './check-update-bottom-sheet.component.html',
})
export class CheckUpdateBottomSheetComponent {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CheckUpdateBottomSheetComponent>
  ) { }

  confirm() {
    this.bottomSheetRef.dismiss();
  }
}
