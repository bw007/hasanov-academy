import { Component, computed, DestroyRef, inject, linkedSignal, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { Auth, Favourite } from "@core/services/api";
import { CourseCardComponent } from "@shared/components/course-card/course-card";
import { ButtonModule } from "primeng/button";
import { MessageModule } from "primeng/message";
import { catchError, tap, throwError } from "rxjs";

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
    const prevFavouritetData = this.favourites();
    
    this.favourites.update(oldValues => [ ...oldValues?.filter((item: any) => item?.id !== id) ]);

    this.favourite.removeFromFavourites(id)
      .pipe(
        tap(res => {
          this.auth.verifyUser().pipe(takeUntilDestroyed(this.dsRef)).subscribe();
        }),
        catchError((err) => {
          this.favourites.set(prevFavouritetData);
          return throwError(() => err)
        }),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe()
  }
}