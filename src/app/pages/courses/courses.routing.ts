import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth-guard.service';

import * as pages from './pages';

const routes: Routes = [
  {
    path: '',
    component: pages.CoursesPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: pages.CourseCreatePageComponent,
    data: { title: 'Create Course' },
    canActivate: [AuthGuard]
  },
  // TOOD: handle not existing course
  {
    path: ':id',
    component: pages.CourseUpdatePageComponent,
    data: { title: 'Update Course' },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CoursesRoutingModule {}
