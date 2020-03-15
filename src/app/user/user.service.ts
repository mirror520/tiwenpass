import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Result } from '../model/result';
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

  login(account: string, password: string): Observable<Result<User>> {
    const params = {
      'account': account,
      'password': password
    };

    return this.http.patch(this.baseUrl + '/users/login', params).pipe(
      map((value: Result<User>) => Object.assign(new Result<User>(), value))
    );
  }

  getMockUser(account: string, password: string): Result<User> {
    if ((account != 'mock') || (password != 'mock'))
      return;

    let user = new User();
    user.account = 'mock';
    user.password = 'mock';
    user.name = '假帳號';

    let result = new Result<User>();
    result.status = 'success';
    result.info = ['登入成功'];
    result.data = user;

    return result;
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
