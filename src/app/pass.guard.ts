import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RsaService } from './qr/rsa.service';

@Injectable({
  providedIn: 'root'
})
export class PassGuard implements CanActivate {
  constructor(
    private router: Router,
    private rsaService: RsaService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.rsaService.todayPassColor) {
      console.log('必須先通過體溫量測');

      this.rsaService.redirectUrl = state.url;
      this.router.navigate(['/qr/scan']);
    }

    return true;
  }
  
}
