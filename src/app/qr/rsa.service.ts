import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as JsEncryptModule from 'jsencrypt';

import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private static _todayPassColor: string;
  private static _redirectUrl: string;

  private baseUrl = environment.baseUrl;

  private jsEncrypt;
  private _privkey;

  constructor(private http: HttpClient) {
    this.jsEncrypt = new JsEncryptModule.JSEncrypt();
  }

  getCiphertext(date: Date): Observable<Result<string>> {
    const dateStr = formatDate(date, 'yyyyMMdd', 'en');

    return this.http.get(this.baseUrl + `/privkeys/${dateStr}/ciphertext`).pipe(
      map((value: Result<string>) => Object.assign(new Result<string>(), value))
    );
  }

  getTodayPrivkey(): Observable<Result<string>> {
    return this.http.get(this.baseUrl + '/api/v1/privkeys/today').pipe(
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

  public get todayPassColor(): string {
    return RsaService._todayPassColor;
  }
  public set todayPassColor(value: string) {
    RsaService._todayPassColor = value;
  }

  public get redirectUrl(): string {
    return RsaService._redirectUrl;
  }
  public set redirectUrl(value: string) {
    RsaService._redirectUrl = value;
  }
}
