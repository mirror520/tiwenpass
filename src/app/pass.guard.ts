import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RsaService } from './qr/rsa.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class PassGuard implements CanActivate {
  constructor(
    private router: Router,
    private rsaService: RsaService,
    private userService: UserService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.userService.currentUser) {
      console.log('必須先登入使用者');

      this.rsaService.redirectUrl = state.url;
      this.router.navigate(['/login']);

      return false;
    }

    if (!this.rsaService.todayPassColor) {
      console.log('必須先通過體溫量測');

      this.rsaService.redirectUrl = state.url;
      this.router.navigate(['/qr/scan']);

      return false;
    }

    return true;
  }
  
}
