import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Course } from '../types/course';
import { PaginationParams, PagedResult } from '../types/pagination';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  apiUrl = 'http://localhost:5018/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(params: PaginationParams): Observable<PagedResult<Course>> {
    const { pageNumber, pageSize } = params;
    return this.http.get<PagedResult<Course>>(`${this.apiUrl}`, {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Couse delete successfully')),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error('Failed edit this course'));
      })
    );
  }

  editCourse(id: number, course: Partial<Course>): Observable<Course> {
    console.log(`Attempting to update course with ID: ${id}`);
    console.log('Update payload:', course);

    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap((response) => {
        console.log('Update response:', response);
      }),
      catchError((error) => {
        console.error('Update error details:', {
          status: error.status,
          message: error.message,
          error: error,
        });
        return throwError(
          () => new Error(error.message || 'Failed to edit this course')
        );
      })
    );
  }

  getIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/GetIds`).pipe(
      catchError((error) => {
        console.error('Error fetching course IDs:', error);
        return of([]); // Return empty array as fallback
      })
    );
  }
}
