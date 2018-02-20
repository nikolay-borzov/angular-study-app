import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TakeUntilDestroy, OnDestroy } from 'ngx-take-until-destroy';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../entities/course';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

const inputDebounce = 450;
const filterTermParamName = 'query';

@TakeUntilDestroy()
@Component({
  selector: 'app-page-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesPageComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly destroyed$: Observable<boolean>;

  @ViewChild('filterInput') filterInput: ElementRef;
  filterTerm = '';

  courses$: Observable<Course[]>;

  private path: string;

  constructor(
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Get current path
    this.path = this.route.pathFromRoot
      .filter(route => route.snapshot.url.length)
      .map(route => {
        return route.snapshot.url[0].path;
      })
      .join('/');
  }

  ngOnDestroy() {}

  ngAfterViewInit() {
    // Wait until filterTerm is bound to the view
    // Receive term from URL parameters
    this.courses$ = this.route.paramMap.switchMap((params: ParamMap) => {
      this.filterTerm = params.get(filterTermParamName) || '';
      return this.service.getCourses(this.filterTerm);
    });

    // Use observable to debounce input
    Observable.fromEvent(this.filterInput.nativeElement, 'keyup')
      .debounceTime(inputDebounce)
      .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
      .distinctUntilChanged()
      .takeUntil(this.destroyed$)
      .subscribe(this.updateFilterTerm);
  }

  deleteCourse(course: Course) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { courseName: course.name }
    });

    dialogRef.afterClosed().subscribe(confirmDelete => {
      if (confirmDelete) {
        this.courses$ = this.service.deleteCourse(course.id);
      }
    });
  }

  private updateFilterTerm = value => {
    this.filterTerm = value;

    const params = value ? { [filterTermParamName]: value } : {};

    this.router.navigate([this.path, params]);
    this.service.filterCourses(value);
  };
}
