import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, delay, finalize, map, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class Favourite {
  private http = inject(HttpClient);
  private _favourites = signal<any>([]);

  favourites = this._favourites.asReadonly();

  isLoading = signal(false);
  error = signal('')

  getAllFavourites() {
    this.isLoading.set(true);
    this.error.set("")
    return this.http.get<any>("favourites").pipe(
      tap({
        next: (res) => {
          this._favourites.set([ ...res.data.favourites ])
        }
      }),
      delay(200),
      catchError((error) => {
        this.error.set("Xatolik sodir bo'ldi")
        return throwError(() => error);
      }),
      finalize(() => {        
        this.isLoading.set(false);
      })
    )
  }

  toggleFavourite(courceId: string) {
    return this.http.patch<any>("favourites/toggle/" + courceId, {}).pipe(
      map(res => res.data)
    )
  }

  removeFromFavourites(courseId: string) {
    const prevFavouritetData = this._favourites();
    
    this._favourites.update(oldValues => [ ...oldValues?.filter((item: any) => item?.id !== courseId) ]);

    return this.http.delete("favourites/" + courseId).pipe(
      tap({
        // next: (res) => {
        //   this._favourites.update(oldData => [ ...oldData.filter((item: any) => item.id !== courseId) ])
        // },
        error: () => {
          this._favourites.set(prevFavouritetData);
        }
      })
    )
  }
}