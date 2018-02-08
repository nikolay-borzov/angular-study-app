import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'course.update',
  segment: 'courses/:id',
  defaultHistory: ['courses']
})
@Component({
  selector: 'page-course-update',
  templateUrl: 'course-update.html'
})
export class CourseUpdatePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.courseId = parseInt(navParams.get('id'), 10);
  }

  courseId: number;

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseUpdatePage');
  }
}
