import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route
} from '@angular/router';
import { tap, } from 'rxjs/operators';

import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Promise<boolean> {
    return this.checkLogin(`/${route.path}`);
  }

  checkLogin(url: string): Promise<boolean> {
    return this.loginService
      .isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.loginService.redirectUrl = url;
            this.router.navigate(['/login']);
          }
        }))
      .toPromise();
  }
}
