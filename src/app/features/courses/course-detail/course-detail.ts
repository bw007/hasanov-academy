import { Component, input, OnInit, signal } from "@angular/core";

import { ButtonModule } from "primeng/button";
import { SkeletonModule } from 'primeng/skeleton';
import { CourseHero } from "./course-hero/course-hero";
import { TabsModule } from 'primeng/tabs';
import { CourseOverview } from "./course-overview/course-overview";
import { CourseTopics } from "./course-topics/course-topics";
import { CourseInstructor } from "./course-instructor/course-instructor";
import { CourseFaqs } from "./course-faqs/course-faqs";
import { CourseReviews } from "./course-reviews/course-reviews";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.html",
  imports: [
    CourseHero,
    CourseOverview,
    CourseTopics,
    CourseInstructor,
    CourseFaqs,
    CourseReviews,
    ButtonModule,
    TabsModule,
    SkeletonModule
  ]
})
export class CourseDetail implements OnInit {
  id = input.required<string>();
  isLoading = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  }
}