import { AfterViewInit, Component, DestroyRef, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { Course } from '@core/services/api';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.html',
    imports: [FormsModule, InputIconModule, IconFieldModule, InputTextModule],
  })
export class SearchBar implements AfterViewInit {
  private dsRef = inject(DestroyRef);
  private course = inject(Course);
  searchInput = viewChild.required<ElementRef>('searchInput');

  ngAfterViewInit (): void {
    fromEvent<InputEvent>(this.searchInput().nativeElement, "input")
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((event) => (event.target as HTMLInputElement).value.trim()),
        switchMap((value) => this.course.getAllCourses(value)),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe();
  }
}