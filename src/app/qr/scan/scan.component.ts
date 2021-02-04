import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { 
  isNationalIdentificationNumberValid, 
  isResidentCertificateNumberValid 
} from 'taiwan-id-validator';

import { GuestRegisterDialogComponent } from './guest-register-dialog/guest-register-dialog.component';
import { ScanSuccessDialogComponent } from './scan-success-dialog/scan-success-dialog.component';
import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { Result } from '../../model/result';
import { User } from '../../user/model/user';
import { Guest } from '../../user/model/guest';
import { Token } from '../../user/model/token';
import { Visit } from '../models/visit';
import { Follower} from '../models/follower';
import { NhiUser } from '../models/nhi-user';
import { Building, Location } from '../models/location';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  private _ciphertext: string;
  private _currentLocation: Location;
  private _currentDevice: MediaDeviceInfo = null;

  availableDevices: MediaDeviceInfo[];
  buildings: Building[];
  scanEnabled = true;
  lastUsername: string;
  lastFollowers: Follower[];
  currentGuest: Guest;
  nhiEnabled = false;

  @ViewChild(ZXingScannerComponent) qrScanner: ZXingScannerComponent;
  @ViewChild(MatInput) scanner: MatInput;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private rsaService: RsaService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.rsaService.checkNhiService().subscribe({
      next: (value) => this.nhiEnabled = true,
      error: (err) => console.error(err),
      complete: () => console.log("完成健保卡服務連線測試")
    })

    this.rsaService.getTodayPrivkey().subscribe({
      next: (value) => this.rsaService.privkey = value.data,
      error: (err) => this.faultHandler(err),
      complete: () => console.log('成功取得今天的私鑰')
    });

    this.rsaService.getBuildings().subscribe({
      next: (value) => this.buildings = value,
      error: (err) => console.error(err),
      complete: () => {
        let locationID = +localStorage.getItem("location_id");

        if (locationID == 0) {
          this.currentLocation = this.buildings[0].locations[0];
        }

        for (let building of this.buildings) {
          for (let location of building.locations) {
            if (location.id == locationID) {
              this.currentLocation = location;
              return;
            }
          }
        }
      }
    });
  }

  visit(username: string, followers?: Follower[]) {
    let locationID = 0;
    if (this.currentLocation)
      locationID = this.currentLocation.id

    this.lastUsername = username;
    this.lastFollowers = followers;
    
    this.rsaService.visit(username, locationID, followers).subscribe({
      next: (value) => this.visitResultHandler(value),
      error: (err) => this.faultHandler(err),
    });
  }

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

  scanSuccessHandler(result: string) {
    if (!this.scanEnabled)
      return;

    if (this.scanner.value != "") {
      this.scanner.value = "";
    }

    let username: string;
    let followers: Follower[];
    let success = false;

    if (isNationalIdentificationNumberValid(result.toUpperCase()) || 
        isResidentCertificateNumberValid(result.toUpperCase())) {
      let guest = new Guest();
      guest.id_card = result.toUpperCase();
      this.currentGuest = guest;

      username = guest.id_card;
      success = true;
    } else {
      const user = this.rsaService.decrypt(result);
      if (user) {
        let info = user.split(",")
        username = info[1];

        if (info.length > 2) {
          followers = new Array();
          for (let value of info.slice(2)) {
            followers.push(new Follower(value));
          }
        }

        success = true;
      }
    }

    if ((success) && (this.scanEnabled)) {
      this.scanEnabled = false;
      this.visit(username, followers);
    } else {
      this.snackBar.open('您使用無效或已經過期的條碼', '確定', {
        duration: 2000
      });
    }
  }

  focusScanner() {
    this.scanner.focus();
  }

  switchShowQRCode() {
    this.qrScanner.enable = false;

    this.router.navigate(['/qr/show']);
  }

  loadNhiUser() {
    this.rsaService.getNhiUser().subscribe({
      next: (value) => this.getNhiUserResultHandler(value),
      error: (err) => this.faultHandler(err),
    });
  }

  private visitResultHandler(result: Result<Visit>) {
    const visit: Visit = Object.assign(new Visit(), result.data);

    const dialogRef = this.dialog.open(ScanSuccessDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: visit
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.scanEnabled = true;
    });
  }

  private getNhiUserResultHandler(result: Result<NhiUser>) {
    const guest = new Guest();
    guest.name = result.data.name;
    guest.id_card = result.data.id_card;

    this.currentGuest = guest;

    this.scanEnabled = false;
    this.visit(guest.id_card);
  }

  private faultHandler(error: HttpErrorResponse) {
    const result: Result<any> = Object.assign(new Result(), error.error);
    const info = result.info[0]

    if (error.status === 401) {
      this.userService.refreshToken().subscribe({
        next: (value) => this.refreshTokenHandler(value),
        error: (err) => console.error(err),
        complete: () => console.log('complete')
      });
    }

    if (error.status === 409) {
      const dialogRef = this.dialog.open(GuestRegisterDialogComponent, {
        width: '80%',
        maxWidth: '600px',
        data: this.currentGuest,
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((user: User) => {
        this.scanEnabled = true;
        this.currentGuest = null;

        if ((user) && (user instanceof User)) {
          this.scanEnabled = false;
          this.visit(user.username);

          this.snackBar.open(`${user.name} 已經完成資料登錄`, '確定', {
            duration: 2000
          });
        }

        this.focusScanner();
      });
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

    if (this.lastUsername) {
      this.visit(this.lastUsername, this.lastFollowers);

      this.lastUsername = null;
      this.lastFollowers = null;
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
  }

  set ciphertext(value: string) {
    this._ciphertext = value;
  }

  get ciphertext(): string {
    return this._ciphertext;
  }

  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
  public get currentUser(): User {
    return this.userService.currentUser;
  }

  public get currentLocation(): Location {
    return this._currentLocation;
  }
  public set currentLocation(value: Location) {
    this._currentLocation = value;

    localStorage.setItem("location_id", value.id.toString());
  }

  public get currentDevice(): MediaDeviceInfo {
    return this._currentDevice;
  }
  public set currentDevice(value: MediaDeviceInfo) {
    if (value == null)
      return;

    this._currentDevice = value;
  }
}
