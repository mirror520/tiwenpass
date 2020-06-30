import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';

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
    localStorage.removeItem("account");
    localStorage.removeItem("password");
    localStorage.removeItem("phone_token");

    this.currentUser = null;
    this.router.navigate(['/']);

    this.snackBar.open(`帳號已登出`, '確定', {
      duration: 2000
    });
  }

  switchQRCodeScanner() {
    this.router.navigate(['/qr/scan']);
  }

  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
  public get currentUser(): User {
    return this.userService.currentUser;
  }

  public get qrCreatedDate(): Date {
    return this.rsaService.qrCreatedDate;
  }
}
