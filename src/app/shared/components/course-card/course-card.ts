import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { courseCategory } from "@core/constants";
import { CourseT } from "@core/models";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.html",
  imports: [
    ButtonModule,
    SkeletonModule,
  ]
})
export class CourseCardComponent {
  course = input.required<CourseT>();
  isLoading = input.required();

  courseCategory = courseCategory as any;
}