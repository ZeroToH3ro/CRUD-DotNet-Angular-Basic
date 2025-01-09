import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Student } from '../types/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl = "http://localhost:5018/api/students";

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error(error);
          return throwError(() => new Error("Failed to fetch students"));
        })
      )
  }

  addStudent(student: Student) {
    return this.http.post(this.apiUrl, student).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error("Failed to create student"));
      })
    );
  }

  getStudent(id: number) {
    return this.http.get<Student[]>(this.apiUrl+"/"+id).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error("Failed to fetch student"));
      })
    );
  }

  deleteStudent(id: number) {
    return this.http.delete(this.apiUrl + "/" + id).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error("Failed to create student"));
      })
    );
  }

  editStudent(id: number, student: Student) {
    return this.http.put(this.apiUrl + "/"+student.id, student).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error("Failed to update student"));
      })
    )
  }
}
