import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

import { User } from '../entities/user';

const DELAY = 450;

@Injectable()
export class LoginService {
  private USER_STORAGE_KEY = 'user';
  private API_URL = 'api/users';

  /**
   * Stores URL to be redirected to after succesful login
   */
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  storage = {
    get<T>(key): T | null {
      const rawValue = localStorage.getItem(key);
      return rawValue ? (JSON.parse(rawValue) as T) : null;
    },
    set(key, value) {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      localStorage.removeItem(key);
    }
  };

  isAuthenticated() {
    return Observable.of(this.storage.get<any>(this.USER_STORAGE_KEY)).map(
      user => !!user
    );
  }

  getLoggedUser() {
    return Observable.of(this.storage.get<User>(this.USER_STORAGE_KEY)).delay(
      DELAY
    );
  }

  logIn(login, password) {
    const options = {
      params: new HttpParams().set('id', login).set('password', password)
    };

    return this.http
      .get<User[]>(this.API_URL, options)
      .switchMap(users => {
        // Return error object
        if (users.length === 0) {
          return Observable.throw({ wrongLoginPassword: true });
        }

        const user = users[0];

        // Keep user object in storage and return it
        return Observable.of(
          this.storage.set(this.USER_STORAGE_KEY, user)
        ).mapTo(user);
      })
      .delay(DELAY);
  }

  logOut() {
    return Observable.of(this.storage.remove(this.USER_STORAGE_KEY)).delay(
      DELAY
    );
  }
}
