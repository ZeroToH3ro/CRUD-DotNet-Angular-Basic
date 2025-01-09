import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { AppComponent } from './app.component';

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
    path:'students/:id',
    component:StudentFormComponent
  }
];
