import { NgModule } from '@angular/core';

import { SharedModule, getArrayFromObject } from '../../shared.module';

import * as pages from './pages';

import { CoursesRoutingModule } from './courses.routing';

import { CoursesService } from '../../services/courses.service';

@NgModule({
  imports: [SharedModule, CoursesRoutingModule],
  declarations: [...getArrayFromObject(pages)],
  providers: [CoursesService]
})
export class CoursesModule {}
