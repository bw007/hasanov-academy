import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { delay, map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class Favourite {
  private http = inject(HttpClient);
  private _favourites = signal<any>([]);

  favourites = this._favourites.asReadonly();

  isLoading = signal(false);

  getAllFavourites() {
    this.isLoading.set(true);
    return this.http.get<any>("favourites").pipe(
      tap({
        next: (res) => {
          this._favourites.set([ ...res.data.favourites ])
        }
      }),
      delay(200),
      tap(_ => {        
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
    return this.http.delete("favourites/" + courseId).pipe(
      tap({
        next: (res) => {
          this._favourites.update(oldData => [ ...oldData.filter((item: any) => item.id !== courseId) ])
        }
      })
    )
  }
}