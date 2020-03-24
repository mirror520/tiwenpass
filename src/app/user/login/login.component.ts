import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

import { UserService } from '../user.service';
import { Result } from '../../model/result';
import { User } from '../model/user';
import { Guest } from '../model/guest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  verify = false;
  tabGroupIndex = 0;
  otp_code = "";
  otp_ttl = 60;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder:'',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };

  loginTccgUserFormGroup: FormGroup;
  registerGuestUserFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.loginTccgUserFormGroup = this.formBuilder.group({
      account: [
        null,
        Validators.required
      ],
      password: [
        null,
        Validators.required
      ]
    });

    this.registerGuestUserFormGroup = this.formBuilder.group({
      name: [
        null,
        Validators.required
      ],
      phone: [
        null,
        Validators.required
      ]
    });
  }

  loginTccgUser(account: string, password: string) {
    this.currentUser = null;

    this.userService.loginTccgUser(account, password)
                    .subscribe({
                      next: (value) => this.loginTccgUserResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  registerGuestUser(name: string, phone: string) {
    this.currentUser = null;

    this.userService.registerGuestUser(name, phone)
                    .subscribe({
                      next: (value) => this.registerGuestUserResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  verifyGuestUserPhoneOTP(value: string) {
    const guest = this.currentUser.guest;
    guest.phone_otp = value;

    this.userService.verifyGuestUserPhoneOTP(guest)
                    .subscribe({
                      next: (value) => this.verifyGuestUserPhoneOTPResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  selectedIndexChangeHandler(index: number) {
    this.tabGroupIndex = index;
  }

  otpInputChangeHandler(value: string) {
    this.otp_code = value;
  }

  private loginTccgUserResultHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);
    const info = result.info[0];
    this.currentUser = user;

    this.snackBar.open(info, '確定', {
      duration: 2000
    });

    if (this.userService.redirectUrl != null) {
      this.router.navigate([this.userService.redirectUrl]);
      this.userService.redirectUrl = null;
    } else {
      this.router.navigate(['/qr/scan']);
    }
  }

  private registerGuestUserResultHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);
    const info = result.info[0];
    this.currentUser = user;

    this.userService.sendGuestPhoneOTP(user.id, user.guest.phone)
                    .subscribe({
                      next: (value) => this.sendGuestPhoneOTPResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });

    this.registerGuestUserFormGroup.get("name").disable()
    this.registerGuestUserFormGroup.get("phone").disable()

    this.snackBar.open(info, '確定', {
      duration: 2000
    });
  }

  private sendGuestPhoneOTPResultHandler(result: Result<Guest>) {
    const guest: Guest = Object.assign(new Guest(), result.data);
    const info = result.info[0];
    this.currentUser.guest = guest;

    this.verify = true;
    this.otp_code = "";
    this.otp_ttl = 60;

    timer(1000, 1000).pipe(
      takeWhile(() => this.otp_ttl > 0),
      map(() => this.otp_ttl--)
    ).subscribe(() => console.log(this.otp_ttl));

    this.snackBar.open(info, '確定', {
      duration: 2000
    });
  }

  private verifyGuestUserPhoneOTPResultHandler(result: Result<Guest>) {
    const guest: Guest = Object.assign(new Guest(), result.data);
    const info = result.info[0];
    this.currentUser.guest = guest;

    this.snackBar.open(info, '確定', {
      duration: 2000
    });

    if (this.userService.redirectUrl != null) {
      this.router.navigate([this.userService.redirectUrl]);
      this.userService.redirectUrl = null;
    } else {
      this.router.navigate(['/qr/show']);
    }
  }

  private faultHandler(error: HttpErrorResponse) {
    let failureResult: Result<User>;
    let info = error.statusText;

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

  public get currentUser(): User {
    return this.userService.currentUser;
  }
  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
}
