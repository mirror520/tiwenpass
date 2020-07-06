import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as JsEncryptModule from 'jsencrypt';

import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';
import { Result } from '../model/result';
import { Building, Location } from './models/location';
import { Department } from '../user/model/department';
import { Visit } from './models/visit';
import { Follower } from './models/follower';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private static _redirectUrl: string;

  private baseUrl = environment.baseUrl;

  private jsEncrypt;
  private _privkey;
  private _qrCraetedDate: Date;

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

  getGuestUserQRCode(user_id: number, followers?: string[]): Observable<SafeUrl> {
    const params = {
      'followers': followers.toString()
    };

    return this.http.get(this.baseUrl + `/api/v1/guests/${user_id}/qr`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
      responseType: 'blob',
      params: params
    }).pipe(
      map((value: Blob) => {
        this.qrCreatedDate = new Date();

        let objUrl = URL.createObjectURL(value);
        return this.domSanitizer.bypassSecurityTrustUrl(objUrl);
      })
    );
  }

  visit(username: string, location_id: number, followers?: Follower[]): Observable<Result<Visit>> {
    const params = {
      'location_id': location_id,
      'followers': followers
    };

    return this.http.put(this.baseUrl + `/api/v1/visits/users/${username}`, params, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Result<Visit>) => Object.assign(new Result<Visit>(), value))
    );
  }

  getBuildings(): Observable<Building[]> {
    return this.http.get(this.baseUrl + '/api/v1/visits/buildings', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Building[]) => {
        const buildings: Building[] = new Array();
        const currentDepartment: Department = this.userService.currentUser.employee.currentDepartment();
        const building = new Building();
        building.id = 0;
        building.building = "所屬單位";
        building.locations = new Array();
        buildings.push(building)

        const location = new Location();
        location.id = 0;
        location.location = currentDepartment.department;
        building.locations.push(location);

        for (const building of value) {
          buildings.push(Object.assign(new Building(), building));
        }

        return buildings;
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

  public get qrCreatedDate(): Date {
    return this._qrCraetedDate;
  }
  public set qrCreatedDate(value: Date) {
    this._qrCraetedDate = value;
  }

  public get redirectUrl(): string {
    return RsaService._redirectUrl;
  }
  public set redirectUrl(value: string) {
    RsaService._redirectUrl = value;
  }
}
