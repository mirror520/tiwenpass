import { Component, OnInit } from '@angular/core';
import { RsaService } from './rsa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '體溫通行';

  private ciphertext: string;

  constructor(
    private rsaService:RsaService
  ) { }

  ngOnInit() {
    this.ciphertext = 'xLggOeWvscbC4s0e/0Pcxw99AWwx7dnni+Zb+/P0AvRZYap0KgvyhLAdOx1/M6gbscBI8XbdcQjdxzEQQoiEyQ==';
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
}
