import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { Course } from '../entities/course';

@Injectable()
export class CoursesService {
  private apiUrl = 'api/courses';

  private filterLastValue = null;

  constructor(private http: HttpClient) { }

  getCourses(filterTerm = '') {
    this.filterLastValue = filterTerm;

    // TODO: return to using combineLatest after migration to Redux
    return this.http
      .get<Course[]>(this.apiUrl).pipe(
        map((courses) => {
          return courses.filter(course => {
            const name = course.name.toLowerCase();

            return name.includes(this.filterLastValue.toLowerCase());
          });
        })
      )
      ;
  }

  getCourse(id: number) {
    // TODO: handle not existing course
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Course) {
    // TODO: handle errors
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(course: Course) {
    // TODO: handle errors
    return this.http.put(this.apiUrl, course);
  }

  /**
   * Deletes specified course
   */
  deleteCourse(id: number) {
    // TODO: handle not existing course
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(switchMap(() => this.getCourses(this.filterLastValue)));
  }
}
