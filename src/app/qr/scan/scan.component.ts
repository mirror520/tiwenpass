import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RsaService } from '../rsa.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  private _ciphertext: string;

  constructor(
    private router: Router,
    private rsaService: RsaService
  ) { }

  ngOnInit() {
    this.rsaService.getCiphertext(new Date()).subscribe({
      next: (value) => this.ciphertext = value.data,
      error: (err) => console.error(err),
      complete: () => console.log('complete')
    });
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]) {
    console.log(devices);
  }

  scanSuccessHandler(result: string) {
    this.rsaService.privkey = result;
    console.log(result);

    const color = this.rsaService.decrypt(this.ciphertext);
    if (color) {
      this.decryptSuccessHandler(color);
    }
  }

  decryptSuccessHandler(color: string) {
    this.rsaService.todayPassColor = color;
    console.log(color);

    if (this.rsaService.redirectUrl != null) {
      this.router.navigate([this.rsaService.redirectUrl]);
      this.rsaService.redirectUrl = null;
    } else {
      this.router.navigate(['/pass'])
    }
  }

  set ciphertext(value: string) {
    console.log(value);

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
}
