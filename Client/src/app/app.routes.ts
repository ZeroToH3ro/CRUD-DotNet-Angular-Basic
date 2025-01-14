import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'students/form',
    component: StudentFormComponent,
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/form',
    component: CourseFormComponent,
  },
  {
    path: 'courses/:id',
    component: CourseFormComponent,
  },
];
