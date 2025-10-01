import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'app-course-hero',
  templateUrl: './course-hero.html',
  imports: [
    ButtonModule,
    SkeletonModule
  ]
})
export class CourseHero {}