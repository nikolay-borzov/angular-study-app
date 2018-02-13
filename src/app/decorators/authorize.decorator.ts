import { NavController } from 'ionic-angular';
import { LoginService } from '../services/login.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

// https://github.com/ionic-team/ionic/issues/11459#issuecomment-337806564
export function Authorize(constructor: Function) {
  // TODO: call original  ionViewCanEnter
  constructor.prototype.ionViewCanEnter = function() {
    const loginService = this.injector.get(LoginService) as LoginService;
    const injector = this.injector;

    return loginService
      .isAuthenticated()
      .do(authenticated => {
        if (!authenticated) {
          // Good old setTimeout saves the day
          setTimeout(function() {
            injector.get(NavController).setRoot('login');
          }, 0);
        }
      })
      .toPromise();
  };
}
