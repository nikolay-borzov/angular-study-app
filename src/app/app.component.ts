import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TakeUntilDestroy, OnDestroy } from 'ngx-take-until-destroy';

import { Observable } from 'rxjs/Observable';

import { LoginService } from './services/login.service';

@TakeUntilDestroy()
@Component({
  templateUrl: 'app.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild(Nav) nav: Nav;

  readonly destroyed$: Observable<boolean>;

  rootPage: 'login';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private loginService: LoginService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    this.loginService
      .isAuthenticated()
      .takeUntil(this.destroyed$)
      .subscribe(authenticated => {
        if (!authenticated) {
          console.log('go to login page');
          this.nav.setRoot('login');
        } else if (window.location.hash === '') {
          this.nav.setRoot('courses');
        }
      });
  }

  // If you work with AOT this method must be present, even if empty!
  // Otherwise 'ng build --prod' will optimize away any calls to ngOnDestroy,
  // even if the method is added by the @TakeUntilDestroy decorator
  ngOnDestroy() {}
}
