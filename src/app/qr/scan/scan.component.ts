import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { isNationalIdentificationNumberValid } from 'taiwan-id-validator';

import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { Result } from '../../model/result';
import { User } from '../../user/model/user';
import { Token } from '../../user/model/token';
import { Location } from '../models/location';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  private _ciphertext: string;
  private _currentLocation: Location;
  
  info: string;

  locations: Observable<Location[]>;

  constructor(
    private rsaService: RsaService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.rsaService.getTodayPrivkey().subscribe({
      next: (value) => this.rsaService.privkey = value.data,
      error: (err) => this.faultHandler(err),
      complete: () => console.log('complete')
    });

    this.locations = this.rsaService.getLocations();
  }

  visit(user_id: number, location_id: number) {
    this.rsaService.visit(user_id, location_id).subscribe({
      next: (value) => this.visitResultHandler(value),
      error: (err) => this.faultHandler(err),
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
    let info = user.split(",")
    let userID = parseInt(info[0]);
    let locationID = 0
    if (this.currentLocation)
      locationID = this.currentLocation.id

    this.visit(userID, locationID);

    this.snackBar.open("成功解析出 QR Code", '確定', {
      duration: 2000
    });
  }

  private visitResultHandler(result: Result<any>) {
    this.info = result.info[0];
  }

  private faultHandler(error: HttpErrorResponse) {
    const failureResult = Object.assign(new Result(), error.error);
    const info = failureResult.info[0]

    if (error.status === 401) {
      this.userService.refreshToken().subscribe({
        next: (value) => this.refreshTokenHandler(value),
        error: (err) => console.error(err),
        complete: () => console.log('complete')
      })
    }

    if (error.status === 422) {

    }

    this.snackBar.open(info, '確定', {
      duration: 2000
    });
  }

  private refreshTokenHandler(result: Result<Token>) {
    const token: Token = Object.assign(new Token(), result.data);
    this.userService.currentUser.token = token;
  }

  set ciphertext(value: string) {
    this._ciphertext = value;
  }

  get ciphertext(): string {
    return this._ciphertext;
  }

  public get currentUser(): User {
    return this.userService.currentUser;
  }

  public get currentLocation(): Location {
    return this._currentLocation;
  }
  public set currentLocation(value: Location) {
    this._currentLocation = value;
  }
}
