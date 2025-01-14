import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../types/course';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { ToastUtils } from '../utils/toast';
import { FormsModule } from '@angular/forms';
import { NumberSequencePipe } from '../pipes/number-sequence.pipe';

@Component({
  selector: 'app-course',
  templateUrl: './courses.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NumberSequencePipe],
})
export class CoursesComponent implements OnInit {
  private readonly courseService = inject(CoursesService);
  private readonly toastrUtil = inject(ToastUtils);

  courses: Course[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  loading: boolean = false;

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService
      .getCourses({ pageNumber: this.currentPage, pageSize: this.pageSize })
      .subscribe({
        next: (response) => {
          this.courses = response.items;
          this.totalPages = response.totalPages;
          this.totalItems = response.totalCount;
          this.loading = false;
        },
        error: (error) => {
          this.toastrUtil.showError('Failed to load courses');
          this.loading = false;
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCourses();
  }

  onPageSizeChange(size: string): void {
    this.pageSize = Number(size);
    this.currentPage = 1; // Reset to first page when changing page size
    this.loadCourses();
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.toastrUtil.showSuccess('Course delete successfully');
        console.log('Course delete successfully');
      },
      error: (error: any) => {
        console.log('Failed to delete', error);
      },
    });
  }

  getDisplayCount(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}
