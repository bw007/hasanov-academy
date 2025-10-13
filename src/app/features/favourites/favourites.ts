import { Component, computed, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { Auth, Favourite } from "@core/services/api";
import { CourseCardComponent } from "@shared/components/course-card/course-card";
import { ButtonModule } from "primeng/button";
import { tap } from "rxjs";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.html',
  imports: [
    CourseCardComponent,
    ButtonModule,
    RouterLink
  ]
})
export class Favourites implements OnInit {
  private dsRef = inject(DestroyRef);
  private favourite = inject(Favourite);
  private auth = inject(Auth);

  favourites = computed(() => this.favourite.favourites());
  isLoading = this.favourite.isLoading;

  ngOnInit(): void {
    this.favourite.getAllFavourites().pipe(takeUntilDestroyed(this.dsRef)).subscribe();
  }

  removeFavourite(id: string) {
    this.favourite.removeFromFavourites(id)
      .pipe(
        tap(res => {
          this.auth.verifyUser().pipe(takeUntilDestroyed(this.dsRef)).subscribe()
        }),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe()
  }
}