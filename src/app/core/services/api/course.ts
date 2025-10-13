import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

import { catchError, delay, finalize, tap, throwError } from "rxjs";
import { ApiResponseT, CourseDataT, CourseT, CourseWithSectionsT, PaginationT, StudentCourseT } from "@core/models";

@Injectable({ providedIn: 'root' })
export class Course {
  private http = inject(HttpClient);

  private _courses = signal<CourseT[]>([]);
  private _myCourses = signal<CourseT[]>([]);
  private _selectedCourse = signal<CourseWithSectionsT | null>(null);
  private _studentSelectedCourse = signal<StudentCourseT | null>(null)
  pagination = signal<PaginationT | null>(null);
  isLoading = signal(false);
  error = signal('');

  allCourses = this._courses.asReadonly();
  myCourses = this._myCourses.asReadonly();
  selectedCourse = this._selectedCourse.asReadonly();
  studentSelectedCourse = this._studentSelectedCourse.asReadonly();
  paginatorConfig = {
    page: 1,
    limit: 6
  }

  getAllCourses(search = '') {
    this.isLoading.set(true);
    this.error.set("");
    return this.http.get<ApiResponseT<CourseDataT>>("public/courses", {
      params: { ...this.paginatorConfig, search }
    }).pipe(
      tap((res => {
        this._courses.set([ ...res.data.courses ]);
      })),
      delay(200),
      catchError((error) => {
        this.error.set("Xatolik sodir bo'ldi")
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    )
  }

  getSelectedCourse(courseId: string) {
    this._selectedCourse.set(null)
    return this.http.get<ApiResponseT<CourseWithSectionsT>>("public/courses/" + courseId).pipe(
      tap((res => {        
        this._selectedCourse.set({ ...res.data })
      }))
    )
  }

  getStudentCourses() {
    return this.http.get<ApiResponseT<CourseDataT>>("student/my-courses").pipe(
      tap((res => {
        console.log(res.data);
        
      }))
    )
  }

  getStudentSelectedCourse(courseId: string) {
    return this.http.get<ApiResponseT<StudentCourseT>>("student/my-courses" + courseId).pipe(
      tap((res => {
        console.log(res);
        
      }))
    )
  }

  enrollCourse(courseId: string) {
    return this.http.post<any>("student/courses/" + courseId + "/enroll", {}).pipe(
      tap(res => {
        console.log(res);
        
      })
    )
  }

}