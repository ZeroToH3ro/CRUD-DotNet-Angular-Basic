import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../types/course';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { ToastUtils } from '../utils/toast';

@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink]
})
export class CoursesComponent implements OnInit {
  private readonly courseService = inject(CoursesService);
  private readonly toastrUtil = inject(ToastUtils);

  courses$ = this.courseService.getCourses();
  showStudentModal = false;
  selectedCourse: Course | null = null;

  ngOnInit(): void {

  }

  openAddModal(): void {
    console.log('Opening add course modal');
  }

  viewCourse(course: Course): void {
    console.log('Viewing course:', course);
  }

  editCourse(id: number, course: Course): void {
    this.courseService.editCourse(id, course).subscribe({
      next: () => {
        this.toastrUtil.showSuccess("Course edit successfully");
        console.log("Course edit successfully");
      },
      error: (error: any) => {
        console.log("Failed to edit")
      }
    })
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.toastrUtil.showSuccess("Course delete successfully");
        console.log("Course delete successfully");
      },
      error: (error: any) => {
        console.log("Failed to delete", error);
      }
    })
  }

  viewStudents(course: Course): void {
    this.selectedCourse = course;
    this.showStudentModal = true;
  }

  closeStudentModal(): void {
    this.showStudentModal = false;
    this.selectedCourse = null;
  }
}
