import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../entities/course';
import { Author } from '../../entities/author';

@Component({
  selector: 'app-page-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreatePageComponent implements OnInit {
  form: FormGroup;

  maxLength = {
    name: 120,
    description: 500
  };

  constructor(
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    /*this.route.paramMap
      .switchMap((params: ParamMap) => {
        const id = parseInt(params.get('id'), 10);
        return this.service.getCourse(id);
      })
      .subscribe(course => {
        this.model = course;
      });*/
  }

  onSubmit() {
    const course = this.prepareSaveData();
    console.log(course);
    // this.service.addCourse(course);
  }

  onCancel() {
    this.form.reset({
      name: ''
    });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: [1, Validators.required],
      date: [null, Validators.required]
    });
  }

  private prepareSaveData() {
    const formModel = this.form.value;

    const dataModel: Course = {
      id: 0,
      name: formModel.name as string,
      description: formModel.description as string,
      durationMinutes: formModel.duration as number,
      createData: formModel.date as Date,
      authors: new Array<Author>()
    };

    return dataModel;
  }
}
