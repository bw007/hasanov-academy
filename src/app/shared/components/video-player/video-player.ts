import { Component, input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  imports: [YouTubePlayer, CommonModule, SkeletonModule]
})
export class VideoPlayer {
  youtubeVideoId = input<string | undefined>();

  onStateChange(event: any) {
    console.log(event.data);
    
    if (event.data === 0) {
      console.log('End');
    }
  }

  onReady(event: any) {
    console.log(event);
  }
}