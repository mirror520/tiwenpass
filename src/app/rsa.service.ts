import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Result } from './model/result';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private tiwengoBaseUrl = environment.tiwengoBaseUrl;

  private jsEncrypt;
  private _privkey;

  constructor(private http: HttpClient) {
    this.jsEncrypt = new JsEncryptModule.JSEncrypt();
  }

  getCiphertext(date: Date): Observable<Result<string>> {
    const dateStr = formatDate(date, 'yyyyMMdd', 'en');

    return this.http.get(this.tiwengoBaseUrl + `/privkeys/${dateStr}/ciphertext`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Result<string>) => Object.assign(new Result<string>(), value))
    );
  }

  decrypt(ciphertext: string): string {
    return this.jsEncrypt.decrypt(ciphertext);
  }

  set privkey(value: string) {
    this.jsEncrypt.setPrivateKey(value);

    this._privkey = value;
  }

  get privkey(): string {
    return this._privkey;
  }

  get token(): string {
    return '';
  }
}
