import { Component, computed, DestroyRef, inject, linkedSignal, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { Auth, Favourite } from "@core/services/api";
import { CourseCardComponent } from "@shared/components/course-card/course-card";
import { ButtonModule } from "primeng/button";
import { MessageModule } from "primeng/message";
import { tap, throttleTime } from "rxjs";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.html',
  imports: [
    CourseCardComponent,
    ButtonModule,
    RouterLink,
    MessageModule
  ]
})
export class Favourites implements OnInit {
  private dsRef = inject(DestroyRef);
  private favourite = inject(Favourite);
  private auth = inject(Auth);

  favourites = linkedSignal(() => this.favourite.favourites());
  isLoading = this.favourite.isLoading;
  error = this.favourite.error;

  ngOnInit(): void {
    this.favourite.getAllFavourites().pipe(takeUntilDestroyed(this.dsRef)).subscribe();
  }

  removeFavourite(id: string) {
    this.favourite.removeFromFavourites(id)
      .pipe(
        tap(res => {
          this.auth.verifyUser().pipe(throttleTime(500), takeUntilDestroyed(this.dsRef)).subscribe();
        }),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe()
  }
}