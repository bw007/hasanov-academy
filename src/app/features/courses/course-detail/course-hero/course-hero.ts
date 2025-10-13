import { Component, computed, DestroyRef, inject, input, output, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { courseCategory } from "@core/constants";
import { CourseT } from "@core/models";
import { Auth } from "@core/services/api";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-course-hero',
  templateUrl: './course-hero.html',
  imports: [
    ButtonModule,
    SkeletonModule,
    RouterLink
  ]
})
export class CourseHero {
  private auth = inject(Auth);
  private router = inject(Router);
  private dsRef = inject(DestroyRef);

  course = input<CourseT>();
  isloading = input.required();
  courseCategory = courseCategory as any;

  enrolledCourses = signal(this.auth.user()?.enrolledCourses || [])

  isEnrolled = computed(() => {
    return this.enrolledCourses().some(course => course === this.course()?.id)
  });
  
  enrollCourse = output<string>()

  onEnrollCourse() {
    const courseId = this.course()?.id!
    if (this.auth.isStudent()) {
      this.enrollCourse.emit(courseId);
      this.enrolledCourses.update(oldData => [ ...oldData, courseId ])
      return;
    }
    this.router.navigateByUrl("auth/sign-in")
  }
}