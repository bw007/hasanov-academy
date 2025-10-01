import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.html",
  imports: [
    ButtonModule,
    RouterLink,
    SkeletonModule
  ]
})
export class CourseCardComponent {
  course = input.required<{ id: number, title: string }>();
  isLoading = input.required();
}