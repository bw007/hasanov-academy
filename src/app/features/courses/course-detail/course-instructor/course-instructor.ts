import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image"

@Component({
  selector: "app-course-instructor",
  templateUrl: "./course-instructor.html",
  imports: [
    ImageModule,
    ButtonModule
  ]
})
export class CourseInstructor {}