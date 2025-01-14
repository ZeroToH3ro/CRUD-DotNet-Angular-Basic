import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { inject } from '@angular/core';
import { RenderMode } from '@angular/ssr';
import { CoursesService } from './services/courses.service';

export const routes: Routes = [
  {
    path: "",
    component: AppComponent
  },
  {
    path: "students",
    component: StudentsComponent,
  },
  {
    path: "students/form",
    component: StudentFormComponent

  },
  {
    path: "courses",
    component: CoursesComponent,
  },
  {
    path: "courses/form",
    component: CourseFormComponent
  },
];
