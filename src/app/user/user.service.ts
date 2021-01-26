import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Result } from '../model/result';
import { User, UserType } from './model/user';
import { Guest } from './model/guest';
import { Token } from './model/token';

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
      'username': account,
      'password': password,
      'type': UserType.Employee
    };

    return this.http.patch(this.baseUrl + '/api/v1/users/tccg/login', params).pipe(
      map((value: Result<User>) => Object.assign(new Result<User>(), value))
    );
  }

  loginGuestUser(phone_token: string): Observable<Result<User>> {
    const params = {
      'username': "0987587487",
      'password': phone_token,
      'type': UserType.Guest
    };

    return this.http.patch(this.baseUrl + '/api/v1/guests/login', params).pipe(
      map((value: Result<User>) => Object.assign(new Result<User>(), value))
    );
  }

  refreshToken(): Observable<Result<Token>> {
    return this.http.patch(this.baseUrl + '/api/v1/auth/refresh_token', null, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token.token}`)
    }).pipe(
      map((value: Result<Token>) => Object.assign(new Result<Token>(), value))
    );
  }

  registerGuestUser(name: string, phone: string, id_card?: string): Observable<Result<User>> {
    const params = {
      'name': name,
      'phone': phone,
      'id_card': id_card
    };

    return this.http.post(this.baseUrl + '/api/v1/guests/register', params).pipe(
      map((value: Result<User>) => Object.assign(new Result<User>(), value))
    );
  }

  verifyGuestUserIDCard(user: User): Observable<Result<User>> {
    return this.http.patch(this.baseUrl + `/api/v1/guests/verify/${user.id}/idcard`, null, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token.token}`)
    }).pipe(
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
      'phone_otp': guest.phone_otp
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

  public get token(): Token {
    return this.currentUser.token;
  }
  public set token(value: Token) {
    this.currentUser.token = value;
  }

  public get redirectUrl(): string {
    return UserService._redirectUrl;
  }
  public set redirectUrl(value: string) {
    UserService._redirectUrl = value;
  }
}
