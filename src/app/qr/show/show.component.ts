import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';

import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private rsaService: RsaService,
    private userService: UserService
  ) { }

  qrCodeImageUrl: Observable<SafeUrl> = this.rsaService.getGuestUserQRCode(this.currentUser.id);

  logout() {
    localStorage.removeItem("phone_token");

    this.currentUser = null;
    this.router.navigate(['/']);

    this.snackBar.open(`帳號已登出`, '確定', {
      duration: 2000
    });
  }

  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
  
  public get currentUser(): User {
    return this.userService.currentUser;
  }
}
