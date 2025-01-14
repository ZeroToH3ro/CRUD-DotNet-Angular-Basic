import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Course } from '../types/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  apiUrl = "http://localhost:5018/api/courses";

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log("Couse delete successfully")),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error("Failed edit this course"));
      })
    );
  }

  editCourse(id: number, course: Partial<Course>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, course).pipe(
      tap(() => console.log("Course updated successfully", course)),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error("Failed edit this course"));
      })
    );
  }

  async getIds(): Promise<string[]> {
    return ['1', '2', '3', '4', '5'];
  }
}
