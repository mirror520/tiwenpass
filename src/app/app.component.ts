import { Component, OnInit } from '@angular/core';
import { RsaService } from './rsa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '體溫通行';

  constructor(
    private rsaService:RsaService
  ) { }

  ngOnInit() {
    this.rsaService.privkey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAPQmSiXcgdYQ7O0SI2WxI28BQnUsIdLvBhWOjeoY0ms9Is/fFZhw
dSqzKRUYVltCsLWnU4Wrym5ex3vl/OS9HRMCAwEAAQJATr4+seFhmroQwBFWi0jL
ZdThK0tViWN/8dntWXAyBVWsKPtIofXu/KJ0PMPcOA8C6W+VwzLgTuS+5Vh2c+TP
QQIhAPZD4zMK/0c49qeb0HZ1GuIcQwwsO0IUR628SllPGXMzAiEA/cz+Lb/nWgXr
utrvLrvJbDl2gQn02B7s0m9glgDVrqECIFg354rgdKRZ9poCSkI1HyVCxI32xl+c
jjThj6zAljhbAiEA+5/UVOlQ5ri+CIhs4Cl/vlOOQMrtO6QVaWDRIob7U2ECIF6w
EBWTvEkrw/xt0Drx75xeCtytKHQqIlDGNk4do2P6
-----END RSA PRIVATE KEY-----`;

    let color = this.rsaService.decrypt('GPBpr/0FbUWsgYAv79zQ+mropia0FCJP6ZLFH4Es9gjrwaPnGTcIW5sO03aaui9xKc0YgK7Fq4UHZZU4V+J5pQ==');
    console.log(color);
  }
}
