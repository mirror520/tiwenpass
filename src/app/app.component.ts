import { Component, OnInit } from '@angular/core';
import { RsaService } from './rsa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '體溫通行';

  private _ciphertext: string;

  constructor(
    private rsaService:RsaService
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

    let color = this.rsaService.decrypt(this.ciphertext);
    console.log(color);
  }

  set ciphertext(value: string) {
    console.log(value);

    this._ciphertext = value;
  }

  get ciphertext(): string {
    return this._ciphertext;
  }
}
