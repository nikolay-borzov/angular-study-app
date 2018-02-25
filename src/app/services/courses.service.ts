import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { catchError } from 'rxjs/operators';

import { Course } from '../entities/course';

@Injectable()
export class CoursesService {
  private apiUrl = 'api/courses';

  private filter$: BehaviorSubject<string>;

  constructor(private http: HttpClient) {}

  getCourses(filterTerm = '') {
    if (!this.filter$) {
      this.filter$ = new BehaviorSubject(filterTerm);
    } else {
      this.filterCourses(filterTerm);
    }

    return this.http
      .get<Course[]>(this.apiUrl)
      .combineLatest(this.filter$, (courses, term) => {
        return courses.filter(course => {
          const name = course.name.toLowerCase();

          return name.includes(term.toLowerCase());
        });
      });
  }

  filterCourses(filterTerm: string) {
    this.filter$.next(filterTerm);
  }

  getCourse(id: number) {
    const url = `${this.apiUrl}/${id}`;
    // TODO: handle not existing course
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addCourse(course: Course) {
    const hero = { name };
    // TODO: handle errors
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(course: Course) {
    // TODO: handle errors
    return this.http.put(this.apiUrl, course);
  }

  /**
   * Deletes specified course
   * @param {number} id - Course ID to delete
   * @returns {Observable<Course[]>} - Courses observable list
   */
  deleteCourse(id: number) {
    const url = `${this.apiUrl}/${id}`;
    // TODO: handle not existing course
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .switchMap(() => this.getCourses());
  }
}
