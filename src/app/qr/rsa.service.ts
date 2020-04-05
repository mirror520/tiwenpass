import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as JsEncryptModule from 'jsencrypt';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';
import { Result } from '../model/result';
import { Location } from './models/location';
import { Department } from '../user/model/department';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private static _redirectUrl: string;

  private baseUrl = environment.baseUrl;

  private jsEncrypt;
  private _privkey;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.jsEncrypt = new JsEncryptModule.JSEncrypt();
  }

  getTodayPrivkey(): Observable<Result<string>> {
    return this.http.get(this.baseUrl + '/api/v1/privkeys/today', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Result<string>) => Object.assign(new Result<string>(), value))
    );
  }

  getGuestUserQRCode(user_id: number): Observable<SafeUrl> {
    return this.http.get(this.baseUrl + `/api/v1/guests/${user_id}/qr`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      responseType: 'blob'
    }).pipe(
      map((value: Blob) => {
        let objUrl = URL.createObjectURL(value);
        return this.domSanitizer.bypassSecurityTrustUrl(objUrl);
      })
    );
  }

  visit(username: string, location_id: number): Observable<Result<any>> {
    const params = {
      'id': location_id
    };

    return this.http.put(this.baseUrl + `/api/v1/visits/users/${username}`, params, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Result<any>) => Object.assign(new Result<any>(), value))
    );
  }

  getLocations(): Observable<Location[]> {
    return this.http.get(this.baseUrl + '/api/v1/visits/locations', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Location[]) => {
        const locations: Location[] = new Array();
        const currentDepartment: Department = this.userService.currentUser.employee.currentDepartment();
        const location = new Location();
        location.id = 0;
        location.location = currentDepartment.department;
        locations.push(location)

        for (const location of value) {
          locations.push(Object.assign(new Location(), location));
        }

        return locations;
      })
    )
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

  private get token(): string {
    return this.userService.currentUser.token.token;
  }

  public get redirectUrl(): string {
    return RsaService._redirectUrl;
  }
  public set redirectUrl(value: string) {
    RsaService._redirectUrl = value;
  }
}
