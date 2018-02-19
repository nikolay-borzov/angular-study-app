import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { TakeUntilDestroy, OnDestroy } from 'ngx-take-until-destroy';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../entities/course';

const inputDebounce = 450;

@TakeUntilDestroy()
@Component({
  selector: 'app-page-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesPageComponent implements AfterViewInit, OnDestroy {
  readonly destroyed$: Observable<boolean>;

  @ViewChild('filterInput') filterInput: ElementRef;
  filterTerm = '';

  courses$: Observable<Course[]>;

  loading = true;

  constructor(private service: CoursesService, private route: ActivatedRoute) {}

  ngOnDestroy() {}

  ngAfterViewInit() {
    // Wait till filterTerm is bound to the view
    // Receive term from URL parameters
    this.courses$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.filterTerm = params.get('query') || '';

        return this.service.getCourses(this.filterTerm);
      })
      .takeUntil(this.destroyed$)
      .do(this.stopLoading)
      .finally(this.stopLoading);

    // Use observable to debounce input
    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(inputDebounce)
      .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
      .distinctUntilChanged()
      .takeUntil(this.destroyed$)
      .subscribe(this.onFilterChange);
  }

  clearFilter() {
    this.startLoading();
    this.filterTerm = '';
    this.service.filterCourses('');
  }

  private onFilterChange = term => {
    this.startLoading();
    this.filterTerm = term;
    this.service.filterCourses(term);
  };

  private startLoading = () => {
    this.loading = true;
  };

  private stopLoading = () => {
    this.loading = false;
  };
}
