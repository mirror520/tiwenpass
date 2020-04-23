import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user/user.service';
import { UserType } from './user/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {} 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUser = this.userService.currentUser;
    if (!currentUser) {
      console.log('必須先登入使用者');

      this.userService.redirectUrl = state.url;
      this.router.navigate(['/login']);

      return false;
    }

    if (state.url === '/qr/scan')
      return currentUser.type == UserType.Employee;

    if (state.url === '/qr/show')
      return currentUser.type == UserType.Guest || 
             currentUser.type == UserType.Employee;

    return true;
  }
  
}
