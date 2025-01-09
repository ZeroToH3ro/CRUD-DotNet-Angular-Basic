import { Component, OnInit, inject } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students$!: Observable<Student[]>;
  private readonly studentService = inject(StudentsService);
  private readonly toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getStudents();
  }

  delete(id: number) {
    console.log(id);

    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        this.getStudents();
        this.toastrService.success("success delete student");
      },
      error: err => {
        console.log(err);
        this.toastrService.success("Sucessfully Deleted");

      }
    })
  }

  private getStudents(): void {
    this.students$ = this.studentService.getStudents();
  }
}
