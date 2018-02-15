import { NgModule } from '@angular/core';

import { SharedModule, getArrayFromObject } from '../../shared.module';

import * as pages from './pages';

import { CoursesRoutingModule } from './courses.routing';

@NgModule({
  imports: [SharedModule, CoursesRoutingModule],
  declarations: [...getArrayFromObject(pages)]
})
export class CoursesModule {}
