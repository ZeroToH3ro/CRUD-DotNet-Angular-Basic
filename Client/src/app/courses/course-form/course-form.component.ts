import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../types/course';
import { CoursesService } from '../../services/courses.service';
import { ToastUtils } from '../../utils/toast';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEditMode = false;
  courseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastUtils
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validators: this.dateValidator });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.courseId = +id;
      this.loadCourse(this.courseId);
    }
  }

  private loadCourse(id: number): void {
    this.courseService.getCourse(id).subscribe({
      next: (course: Course) => {
        this.courseForm.patchValue({
          name: course.name,
          description: course.description,
          startDate: this.formatDateForInput(course.startDate),
          endDate: this.formatDateForInput(course.endDate)
        });
      },
      error: (error) => {
        console.error('Error loading course:', error);
        this.toastr.showError(error.toString());
        this.router.navigate(['/courses']);
      }
    });
  }

  private formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const courseData: Partial<Course> = {
        ...this.courseForm.value,
        startDate: new Date(this.courseForm.value.startDate),
        endDate: new Date(this.courseForm.value.endDate),
        students: []
      };

      const request$ = this.isEditMode && this.courseId
        ? this.courseService.updateCourse(this.courseId, courseData)
        : this.courseService.createCourse(courseData);

      request$.subscribe({
        next: () => {
          this.toastr.showSuccess(`Course ${this.isEditMode ? 'updating' : 'creating'} successfully`)
        },
        error: (error: any) => {
          this.toastr.showError(error.toString());
          console.error('Error:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.courseForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  private dateValidator(group: FormGroup): {[key: string]: any} | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;

    if (start && end && new Date(start) > new Date(end)) {
      return { dateRange: true };
    }
    return null;
  }
}
