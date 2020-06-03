import { Component, ApplicationRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private appRef: ApplicationRef, 
    private snackBar: MatSnackBar,
    private updates: SwUpdate) {
    if (updates.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const checkInterval$ = interval(1 * 10 * 60 * 1000);
      const checkAppIsStableAtInterval$ = concat(appIsStable$, checkInterval$);

      checkAppIsStableAtInterval$.subscribe(() => {
        console.log('Service worker 檢查更新');
        updates.checkForUpdate();
      });

      updates.available.subscribe((event) => {
        const snackBarRef = this.snackBar.open('需要更新系統', '確定', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        snackBarRef.afterDismissed().subscribe(
          () => window.location.reload()
        );
      });
    } else {
      console.log('不支援 Service worker');
    }
  }
}
