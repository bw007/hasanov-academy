import { Component, input, output } from "@angular/core";
import { DialogModule } from 'primeng/dialog';
import { VideoPlayer } from "@shared/components/video-player/video-player";

@Component({
  selector: 'app-lesson-preview',
  templateUrl: './lesson-preview.html',
  imports: [
    DialogModule,
    VideoPlayer
]
})
export class LessonPreview {
  visible = input.required<boolean>();
  visibleChange = output<boolean>();

  lessonData = input<{ title: string; videoId?: string | undefined; } | null>();
}