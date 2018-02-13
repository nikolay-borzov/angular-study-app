import { Component, Injector } from '@angular/core';

import { IonicPage } from 'ionic-angular';

import { BasePage } from '../basePage';
import { Authorize } from '../../app/decorators';

@Authorize
@IonicPage({
  name: 'courses',
  segment: 'courses'
})
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html'
})
export class CoursesPage extends BasePage {
  constructor(injector: Injector) {
    super(injector);
  }
}
