import { NgModule } from '@angular/core';

import { SharedModule, getArrayFromObject } from '../../shared.module';

import * as pages from './pages';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

import { CoursesRoutingModule } from './courses.routing';

import { CoursesService } from '../../services/courses.service';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  imports: [SharedModule, CoursesRoutingModule],
  declarations: [...getArrayFromObject(pages), DeleteDialogComponent, EditFormComponent],
  providers: [CoursesService],
  // Add dynamically added components
  // https://material.angular.io/components/dialog/overview#configuring-dialog-content-via-code-entrycomponents-code-
  entryComponents: [DeleteDialogComponent]
})
export class CoursesModule {}
