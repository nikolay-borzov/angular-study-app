import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BasePage } from '../basePage';

@IonicPage({
  name: 'course.create',
  segment: 'courses/new',
  defaultHistory: ['courses']
})
@Component({
  selector: 'page-course-create',
  templateUrl: 'course-create.html'
})
export class CourseCreatePage extends BasePage {
  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    super(injector);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseCreatePage');
  }
}
