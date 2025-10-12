import { Component, input } from "@angular/core";
import { InstructorT } from "@core/models";
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
export class CourseInstructor {
  inctructor = input.required<InstructorT | undefined>()
}