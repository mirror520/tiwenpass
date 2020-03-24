import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Result } from '../model/result';
import { User } from './model/user';
import { Guest } from './model/guest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static _currentUser: User;
  private static _redirectUrl: string;

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  loginTccgUser(account: string, password: string): Observable<Result<User>> {
    const params = {
      'account': account,
      'password': password
    };

    return this.http.patch(this.baseUrl + '/api/v1/users/tccg/login', params).pipe(
      map((value: Result<User>) => Object.assign(new Result<User>(), value))
    );
  }

  registerGuestUser(name: string, phone: string): Observable<Result<User>> {
    const params = {
      'name': name,
      'phone': phone
    };

    return this.http.post(this.baseUrl + '/api/v1/guests/register', params).pipe(
      map((value: Result<User>) => Object.assign(new Result<User>(), value))
    );
  }

  sendGuestPhoneOTP(user_id: number, phone: string): Observable<Result<Guest>> {
    const params = {
      'user_id': user_id,
      'phone': phone
    };

    return this.http.patch(this.baseUrl + '/api/v1/guests/register/phone/otp', params).pipe(
      map((value: Result<Guest>) => Object.assign(new Result<Guest>(), value))
    );
  }

  verifyGuestUserPhoneOTP(guest: Guest): Observable<Result<Guest>> {
    // const params = guest;
    const params = {
      'user_id': guest.user_id,
      'phone': guest.phone,
      'phone_otp': guest.phone_otp,
      'phone_token': guest.phone_token
    }

    return this.http.patch(this.baseUrl + '/api/v1/guests/register/phone/otp/verify', params).pipe(
      map((value: Result<Guest>) => Object.assign(new Result<Guest>(), value))
    );
  }

  public get currentUser(): User {
    return UserService._currentUser;
  }
  public set currentUser(value: User) {
    UserService._currentUser = value;
  }

  public get redirectUrl(): string {
    return UserService._redirectUrl;
  }
  public set redirectUrl(value: string) {
    UserService._redirectUrl = value;
  }
}
