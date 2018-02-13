import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading
} from 'ionic-angular';

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loadingIndicator: Loading = null;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) {}

  showLoading(show: boolean) {
    if (show && this.loadingIndicator === null) {
      this.loadingIndicator = this.loadingCtrl.create();
      this.loadingIndicator.present();
    } else {
      this.loadingIndicator.dismiss();
      this.loadingIndicator = null;
    }
  }

  goToCoursesPage() {
    this.navCtrl.push('courses');
  }

  ionViewDidLoad() {
    console.log('login page');
  }
}
