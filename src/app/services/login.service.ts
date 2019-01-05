import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators'

import { User } from '../entities/user';

@Injectable()
export class LoginService {
  private userStorageKey = 'user';
  private apiUrl = 'api/users';

  private loggedUserSubject: BehaviorSubject<User>;

  /**
   * Stores URL to be redirected to after successful login
   */
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  storage = {
    get<T>(key: string): T | null {
      const rawValue = localStorage.getItem(key);
      return rawValue ? (JSON.parse(rawValue) as T) : null;
    },
    set(key: string, value) {
      return localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string) {
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

    return of(user);
  }

  isAuthenticated() {
    // TODO: Manage to use this.loggedUser()
    return of(!!this.getUser()); //this.loggedUser().map(user => !!user);
  }

  loggedUser() {
    if (!this.loggedUserSubject) {
      const user = this.getUser();
      this.loggedUserSubject = new BehaviorSubject(user);
    }

    return this.loggedUserSubject;
  }

  logIn(login, password) {
    const options = {
      params: new HttpParams().set('id', login).set('password', password)
    };

    return this.http.get<User[]>(this.apiUrl, options).pipe(
      switchMap(users => {
        // Return error object
        if (users.length === 0) {
          return throwError({ wrongLoginPassword: true });
        }

        const user = users[0];

        // Keep user object in storage and return it
        return this.setUser(user);
      })
    );
  }

  logOut() {
    return this.setUser(null);
  }
}
