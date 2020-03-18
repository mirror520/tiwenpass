import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static _currentUser: User;
  private static _redirectUrl: string;

  private baseUrl = environment.tccgBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(account: string, password: string): Observable<User> {
    const params = {
      'account': account,
      'password': password
    };

    return this.http.patch(this.baseUrl + '/v1.0/tccg/users/login', params).pipe(
      map((value: User) => Object.assign(new User(), value))
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
