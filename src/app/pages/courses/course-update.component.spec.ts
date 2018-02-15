import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUpdatePageComponent } from './course-update.component';

describe('CourseUpdateComponent', () => {
  let component: CourseUpdatePageComponent;
  let fixture: ComponentFixture<CourseUpdatePageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CourseUpdatePageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
