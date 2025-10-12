import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'durationFormat' })
export class DurationFormatPipe implements PipeTransform {
  transform(second: number): string {
    if (!second) return '0 daq';
    
    const minutes = Math.floor(second / 60);
    const hours = Math.floor(minutes / 60);

    const parts: string[] = [];

    if (hours > 0) {
      parts.push(`${hours} soat`);
    }
    if (minutes % 60 > 0) {
      parts.push(`${minutes % 60} daq`);
    }

    return parts.join(' ') || second + ' s';
  }
}