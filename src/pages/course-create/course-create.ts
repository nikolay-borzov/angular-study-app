import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'course.create',
  segment: 'courses/new',
  defaultHistory: ['courses']
})
@Component({
  selector: 'page-course-create',
  templateUrl: 'course-create.html'
})
export class CourseCreatePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseCreatePage');
  }
}
