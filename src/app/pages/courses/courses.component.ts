import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, fromEvent, } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { MatDialog } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../entities/course';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

const inputDebounce = 450;
const filterTermParamName = 'query';

@Component({
  selector: 'app-page-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filterInput') filterInput: ElementRef;
  filterTerm = '';

  courses$: Observable<Course[]>;

  private path: string;

  constructor(
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Get current path
    this.path = this.route.pathFromRoot
      .filter(route => route.snapshot.url.length)
      .map(route => {
        return route.snapshot.url[0].path;
      })
      .join('/');

    // Set filter term from URL query string and load courses
    this.route.paramMap.pipe(untilDestroyed(this))
      .subscribe((params: ParamMap) => {
        this.filterTerm = params.get(filterTermParamName) || '';
        this.courses$ = this.service.getCourses(this.filterTerm);
      });
  }

  ngOnDestroy() { }

  ngAfterViewInit() {
    // Use observable to debounce input
    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(inputDebounce),
        map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        untilDestroyed(this)
      )
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
    const params = value ? { [filterTermParamName]: value } : {};

    this.router.navigate([this.path, params]);
  };
}
