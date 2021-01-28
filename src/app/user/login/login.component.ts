import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { map, takeWhile, switchMap } from 'rxjs/operators';

import { UserService } from '../user.service';
import { Result } from '../../model/result';
import { User } from '../model/user';
import { Guest } from '../model/guest';
import { DuplicateVerificationDialogComponent } from './duplicate-verification-dialog/duplicate-verification-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  verify = false;
  agreed = false;
  tabGroupIndex = 0;
  step = 0;

  otp_code = "";
  otp_ttl = 60;

  loginTccgUserFormGroup: FormGroup;
  registerGuestUserFormGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) {
    let token;

    this.activatedRoute.queryParams.subscribe(params => {
      token = params['t'];
    });

    if (!token)
      token = this.activatedRoute.snapshot.paramMap.get('token');

    if (token) {
      this.loginGuestUser(token);
    }

    let account = localStorage.getItem("account");
    let password = localStorage.getItem("password");

    if ((account != null) && (password != null)) {
      this.loginTccgUser(account, password);
      return;
    }

    let phone_token = localStorage.getItem("phone_token");
    if (phone_token != null) {
      this.loginGuestUser(phone_token);
    }
  }

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
        [Validators.required, Validators.pattern("09[0-9]{8}")]
      ],
      otp_code: [
        null,
        [Validators.pattern("[0-9]{4}")]
      ]
    });
  }

  agreedNotice() {
    this.agreed = true;
    this.nextStep();
  }

  loginTccgUser(account: string, password: string) {
    this.currentUser = null;

    this.userService.loginTccgUser(account, password)
                    .subscribe({
                      next: (value) => {
                        localStorage.setItem("account", account)
                        localStorage.setItem("password", password)

                        this.loginTccgUserResultHandler(value)
                      },
                      error: (error) => {
                        localStorage.removeItem("account");
                        localStorage.removeItem("password");

                        this.faultHandler(error);
                      }
                    });
  }

  loginGuestUser(phone_token: string) {
    this.currentUser = null;

    this.userService.loginGuestUser(phone_token)
                    .subscribe({
                      next: (value) => {
                        localStorage.setItem("phone_token", phone_token);
                        this.loginGuestUserResultHandler(value);
                      },
                      error: (error) => {
                        localStorage.removeItem("phone_token");
                        this.faultHandler(error);
                      }
                    });
  }

  registerGuestUser(name: string, phone: string) {
    this.currentUser = null;

    this.userService.registerGuestUser(name, phone)
                    .subscribe({
                      next: (value) => this.registerGuestUserResultHandler(value),
                      error: (error) => this.registerGuestUserFaultHandler(error)
                    });
  }

  sendGuestPhoneOTP(user_id: number, phone: string) {
    this.userService.sendGuestPhoneOTP(user_id, phone)
                    .subscribe({
                      next: (value) => this.sendGuestPhoneOTPResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  verifyGuestUserPhoneOTP() {
    const guest = this.currentUser.guest;
    guest.phone_otp = this.registerGuestUserFormGroup.get("otp_code").value;

    this.userService.verifyGuestUserPhoneOTP(guest)
                    .subscribe({
                      next: (value) => this.verifyGuestUserPhoneOTPResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  selectedIndexChangeHandler(index: number) {
    this.tabGroupIndex = index;
  }

  otpInputChangeHandler(value) {
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
      this.userService.redirectUrl = null;
      this.router.navigate(['/qr/scan']);
    } else {
      this.router.navigate(['/qr/scan']);
    }
  }

  private loginGuestUserResultHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);
    const info = result.info[0];
    this.currentUser = user;

    this.snackBar.open(info, '確定', {
      duration: 2000
    });

    if (this.userService.redirectUrl != null) {
      this.userService.redirectUrl = null;
      this.router.navigate(['/qr/show']);
    } else {
      this.router.navigate(['/qr/show']);
    }
  }

  private registerGuestUserResultHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);
    const info = result.info[0];
    this.currentUser = user;

    this.sendGuestPhoneOTP(user.id, user.guest.phone);

    this.snackBar.open(info, '確定', {
      duration: 2000
    });
  }

  private registerGuestUserFaultHandler(error: HttpErrorResponse) {
    const failureResult = Object.assign(new Result(), error.error);
    const info = failureResult.info[0];
    const user: User = Object.assign(new User(), failureResult.data)
    this.currentUser = user;

    if (error.status === 401) {
      this.sendGuestPhoneOTP(user.id, user.guest.phone);

      this.snackBar.open(info, '確定', {
        duration: 2000
      });
    }

    if (error.status === 409) {
      const dialogRef = this.dialog.open(DuplicateVerificationDialogComponent, {
        width: '80%',
        maxWidth: '600px',
        data: user
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.sendGuestPhoneOTP(user.id, user.guest.phone);
        }
      });
    }

    if (error.status === 429) {
      this.snackBar.open(info, '確定', {
        duration: 2000
      });     
    }
  }

  private sendGuestPhoneOTPResultHandler(result: Result<Guest>) {
    const guest: Guest = Object.assign(new Guest(), result.data);
    this.currentUser.guest = guest;

    this.verify = true;
    this.otp_code = "";
    this.otp_ttl = 60;

    this.registerGuestUserFormGroup.get("name").disable();
    this.registerGuestUserFormGroup.get("phone").disable();
    this.nextStep();

    timer(1000, 1000).pipe(
      takeWhile(() => this.otp_ttl > 0),
      map(() => this.otp_ttl--)
    ).subscribe({
      next: (value) => console.log(`otp_ttl: ${this.otp_ttl}`),
      error: (err) => console.error(err),
      complete: () => {
        this.registerGuestUserFormGroup.get("name").enable();
        this.registerGuestUserFormGroup.get("phone").enable();
        this.verify = false;
        this.setStep(1);
      }
    });
  }

  private verifyGuestUserPhoneOTPResultHandler(result: Result<Guest>) {
    const guest: Guest = Object.assign(new Guest(), result.data);
    const info = result.info[0];
    this.currentUser.guest = guest;

    this.snackBar.open(info, '確定', {
      duration: 2000
    });

    this.loginGuestUser(guest.phone_token);
  }


  private faultHandler(error: HttpErrorResponse) {
    let failureResult: Result<User>;
    let info = error.statusText;

    if ((error.status === 401) || (error.status === 422) || (error.status === 429)) {
      failureResult = Object.assign(new Result(), error.error);
      info = failureResult.info[0];
    }

    this.snackBar.open(info, '確定', {
      duration: 2000
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }
  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
}
