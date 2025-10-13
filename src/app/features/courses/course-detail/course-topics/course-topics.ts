import { Component, input, signal } from "@angular/core";
import { CourseSectionT } from "@core/models";
import { DurationFormatPipe } from "@shared/pipes";
import { ButtonModule } from "primeng/button";
import { PanelModule } from 'primeng/panel';
import { LessonPreview } from "./lesson-preview/lesson-preview";

@Component({
  selector: "app-course-topics",
  templateUrl: "./course-topics.html",
  imports: [
    PanelModule,
    ButtonModule,
    DurationFormatPipe,
    LessonPreview
  ],
})
export class CourseTopics {
  topics = input.required<CourseSectionT[]>();
  playerVisible = signal(false);
  selectedLesson = signal<{ title: string, videoId?: string } | null>(null);

  showPlayerDialog(title: string, videoId?: string) {
    this.selectedLesson.set({ title, videoId })
    this.playerVisible.set(true);
  }
}