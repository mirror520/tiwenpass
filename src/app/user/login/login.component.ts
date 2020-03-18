import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../user.service';
import { Result } from '../../model/result';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  tabGroupIndex = 1;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {}

  login(account: string, password: string) {
    console.log(`login user`);

    this.currentUser = null;

    this.userService.login(account, password)
                    .subscribe({
                      next: (value) => this.loginResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  loginGuest(name: string, phone: string, org: string, cause: string, respondent: string) {
    console.log(`login guest`);
  }

  private loginResultHandler(result: User) {
    const user: User = Object.assign(new User(), result);
    this.currentUser = user;

    this.snackBar.open("登入成功", '確定', {
      duration: 2000
    });

    if (this.userService.redirectUrl != null) {
      this.router.navigate([this.userService.redirectUrl]);
      this.userService.redirectUrl = null;
    } else {
      this.router.navigate(['/qr/scan']);
    }
  }

  private faultHandler(error: HttpErrorResponse) {
    let failureResult: Result<User>;
    let info;

    if (error.status === 401) {
      info = error.error;
    }

    if (error.status === 422) {
      failureResult = Object.assign(new Result(), error.error);
      info = failureResult.info[0];
    }

    this.snackBar.open(info, '確定', {
      duration: 2000
    });
  }

  selectedIndexChangeHandler(index: number) {
    this.tabGroupIndex = index;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }
  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
}
