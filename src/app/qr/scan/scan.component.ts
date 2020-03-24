import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNationalIdentificationNumberValid } from 'taiwan-id-validator';

import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  private _ciphertext: string;
  
  info: string;

  constructor(
    private rsaService: RsaService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.rsaService.getTodayPrivkey().subscribe({
      next: (value) => this.rsaService.privkey = value.data,
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    });
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]) {
    console.log(devices);
  }

  scanSuccessHandler(result: string) {
    this.ciphertext = result;
    console.log(`已成功取得密文: ${result}`);

    if (isNationalIdentificationNumberValid(result)) {
      this.info = result;

      this.snackBar.open(`成功解析出身分證`, '確定', {
        duration: 2000
      });
    }

    const user = this.rsaService.decrypt(this.ciphertext);
    console.log(user);
    if (user) {
      this.decryptSuccessHandler(user)
    }
  }

  decryptSuccessHandler(user: string) {
    this.info = user;

    this.snackBar.open("成功解析出 QR Code", '確定', {
      duration: 2000
    });
  }

  set ciphertext(value: string) {
    this._ciphertext = value;
  }

  get ciphertext(): string {
    return this._ciphertext;
  }

  public get todayPassColor(): string {
    return this.rsaService.todayPassColor;
  }
  public set todayPassColor(value: string) {
    this.rsaService.todayPassColor = value;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }
}
