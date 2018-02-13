import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BasePage } from '../basePage';

@IonicPage({
  name: 'course.update',
  segment: 'courses/:id',
  defaultHistory: ['courses']
})
@Component({
  selector: 'page-course-update',
  templateUrl: 'course-update.html'
})
export class CourseUpdatePage extends BasePage {
  constructor(
    injector: Injector,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    super(injector);
    this.courseId = parseInt(navParams.get('id'), 10);
  }

  courseId: number;
}
