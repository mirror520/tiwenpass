import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from '../../../user/user.service';
import { Result } from '../../../model/result';
import { User } from '../../../user/model/user';
import { Guest } from '../../../user/model/guest';

@Component({
  selector: 'app-guest-register-dialog',
  templateUrl: './guest-register-dialog.component.html',
  styleUrls: ['./guest-register-dialog.component.scss']
})
export class GuestRegisterDialogComponent implements OnInit {

  registerGuestUserFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GuestRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Guest,

    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.registerGuestUserFormGroup = this.formBuilder.group({
      id_card: [
        null,
        Validators.required
      ],
      name: [
        null,
        [Validators.required, Validators.pattern("[\u4e00-\u9fa5．]{2,}")]
      ],
      phone: [
        null, 
        [Validators.required, Validators.pattern("0[0-9]{8,9}")]
      ]
    });

    this.registerGuestUserFormGroup.get("id_card").disable();
    this.registerGuestUserFormGroup.get("id_card").setValue(this.data.id_card);

    this.registerGuestUserFormGroup.get("name").setValue(this.data.name);
  }

  registerGuestUser(name: string, phone: string, id_card: string) {
    this.userService.registerGuestUser(name, phone, id_card)
                    .subscribe({
                      next: (value) => this.registerGuestUserResultHandler(value),
                      error: (err) => this.faultHandler(err)
                    });
  }

  verifyGuestUserIDCard(user: User) {
    this.userService.verifyGuestUserIDCard(user)
                    .subscribe({
                      next: (value) => this.verifyGuestUserIDCardHandler(value),
                      error: (err) => this.faultHandler(err)
                    });
  }

  private registerGuestUserResultHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);

    this.verifyGuestUserIDCard(user);
  }

  private verifyGuestUserIDCardHandler(result: Result<User>) {
    const user: User = Object.assign(new User(), result.data);

    this.dialogRef.close(user);
  }

  private faultHandler(error: HttpErrorResponse) {
    let failureResult: Result<User>;
    let info = error.statusText;

    if ((error.status === 401) || (error.status === 422)) {
      failureResult = Object.assign(new Result(), error.error);
      info = failureResult.info[0];
    }
  }
}
