import { Component, DestroyRef, inject, input, OnInit, signal } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { SkeletonModule } from 'primeng/skeleton';
import { CourseHero } from "./course-hero/course-hero";
import { TabsModule } from 'primeng/tabs';
import { CourseTopics } from "./course-topics/course-topics";
import { CourseInstructor } from "./course-instructor/course-instructor";

import { Auth, Course } from "@core/services/api";
import { delay, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Notification } from "@core/services/common";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.html",
  imports: [
    CourseHero,
    CourseTopics,
    CourseInstructor,
    ButtonModule,
    TabsModule,
    SkeletonModule,
  ]
})
export class CourseDetail implements OnInit {
  private dsRef = inject(DestroyRef);
  private course = inject(Course);
  private notification = inject(Notification);
  private auth = inject(Auth);

  selectedCourse = this.course.selectedCourse;
  
  id = input.required<string>();
  isLoading = signal(false);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.course.getSelectedCourse(this.id())
      .pipe(
        delay(400),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe({
        next: () => {
          this.isLoading.set(false)
        }
      });
  };

  onEnrollCourse(courseId: string) {
    this.course.enrollCourse(courseId)
      .pipe(
        tap(() => {
          this.auth.verifyUser().subscribe(); 
          this.notification.success({
            summary: "Kursga obuna yoqildi",
            message: ""
          });
        }),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe();  
  }
}