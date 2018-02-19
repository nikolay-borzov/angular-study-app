import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

import { User } from '../entities/user';

const delay = 450;

@Injectable()
export class LoginService {
  private userStorageKey = 'user';
  private apiUrl = 'api/users';

  private loggedUserSubject: BehaviorSubject<User>;

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

  private getUser() {
    return this.storage.get<User>(this.userStorageKey);
  }

  private setUser(user: User) {
    if (user) {
      this.storage.set(this.userStorageKey, user);
    } else {
      this.storage.remove(this.userStorageKey);
    }

    this.loggedUserSubject.next(user);

    return Observable.of(user);
  }

  isAuthenticated() {
    // TODO: Manage to use this.loggedUser()
    return Observable.of(!!this.getUser()); //this.loggedUser().map(user => !!user);
  }

  loggedUser() {
    if (!this.loggedUserSubject) {
      const user = this.getUser();
      this.loggedUserSubject = new BehaviorSubject(user);
    }

    return this.loggedUserSubject.delay(delay);
  }

  logIn(login, password) {
    const options = {
      params: new HttpParams().set('id', login).set('password', password)
    };

    return this.http
      .get<User[]>(this.apiUrl, options)
      .switchMap(users => {
        // Return error object
        if (users.length === 0) {
          return Observable.throw({ wrongLoginPassword: true });
        }

        const user = users[0];

        // Keep user object in storage and return it
        return this.setUser(user);
      })
      .delay(delay);
  }

  logOut() {
    return this.setUser(null).delay(delay);
  }
}
