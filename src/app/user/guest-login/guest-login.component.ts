import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../user.service';
import { Result } from '../../model/result';
import { User } from '../model/user';

@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.scss']
})
export class GuestLoginComponent implements OnInit {

  loginGuestUserFormGroup: FormGroup;

  constructor(
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loginGuestUserFormGroup = this.formBuilder.group({
      phone: [
        null,
        [Validators.required, Validators.pattern("09[0-9]{8}")]
      ],
      phone_token: [
        null,
        Validators.required
      ]
    });

    this.loginGuestUserFormGroup.get("phone_token").disable();

    this.activedRoute.queryParams.subscribe(params => {
      let token = params['t'];
      console.log(token);
      this.loginGuestUserFormGroup.get("phone_token").setValue(token);
    });
  }

  loginGuestUser(phone: string, phone_token: string) {
    this.currentUser = null;

    this.userService.loginGuestUser(phone, phone_token)
                    .subscribe({
                      next: (value) => this.loginGuestUserResultHandler(value),
                      error: (error) => this.faultHandler(error)
                    });
  }

  private loginGuestUserResultHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);
    const info = result.info[0];
    this.currentUser = user;

    this.snackBar.open(info, '確定', {
      duration: 2000
    });

    if (this.userService.redirectUrl != null) {
      // this.router.navigate([this.userService.redirectUrl]);
      this.userService.redirectUrl = null;
      this.router.navigate(['/qr/show']);
    } else {
      this.router.navigate(['/qr/show']);
    }

  }

  private faultHandler(error: HttpErrorResponse) {
    let failureResult: Result<User>;
    let info = error.statusText;

    if ((error.status === 401) || (error.status === 422)) {
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
