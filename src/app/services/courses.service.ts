import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Course } from '../entities/course';

const delay = 450;

@Injectable()
export class CoursesService {
  private apiUrl = 'api/courses';

  private filter$: BehaviorSubject<string>;

  constructor(private http: HttpClient) {}

  getCourses(filterTerm = '') {
    this.filter$ = new BehaviorSubject(filterTerm);

    return this.http
      .get<Course[]>(this.apiUrl)
      .combineLatest(this.filter$, (courses, term) => {
        return courses.filter(course => {
          const name = course.name.toLowerCase();

          return name.includes(term.toLowerCase());
        });
      })
      .delay(delay);
  }

  filterCourses(filterTerm: string) {
    this.filter$.next(filterTerm);
  }
}
