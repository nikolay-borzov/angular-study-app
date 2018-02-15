import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth-guard.service';

import * as pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: pages.CoursesPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'new',
            component: pages.CourseCreatePageComponent,
            data: { title: 'Create Course' }
          },
          /// TOOD: handle not existing course
          {
            path: ':id',
            component: pages.CourseUpdatePageComponent,
            data: { title: 'Update Course' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CoursesRoutingModule {}
