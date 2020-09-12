import { Component, ApplicationRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

import { CheckUpdateBottomSheetComponent } from './check-update-bottom-sheet/check-update-bottom-sheet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private appRef: ApplicationRef, 
    private bottomSheet: MatBottomSheet,
    private updates: SwUpdate)
  {
    if (updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const checkInterval$ = interval(1 * 10 * 60 * 1000);
      const checkAppIsStableAtInterval$ = concat(appIsStable$, checkInterval$);

      checkAppIsStableAtInterval$.subscribe(() => {
        console.log('Service worker 檢查更新');
        updates.checkForUpdate();
      });

      updates.available.subscribe((event) => {
        console.log('Service worker 有新的版本');

        const bottomSheetRef = this.bottomSheet.open(CheckUpdateBottomSheetComponent);

        bottomSheetRef.afterDismissed().subscribe(
          () => window.location.reload()
        );
      });
    } else {
      console.log('不支援 Service worker');
    }
  }
}
