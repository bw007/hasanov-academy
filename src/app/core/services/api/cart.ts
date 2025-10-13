import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, delay, finalize, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class Cart {
  private http = inject(HttpClient);
  private _cartData = signal<any>([]);
  
  cartData = this._cartData.asReadonly();

  isLoading = signal(false);
  error = signal('');

  getAllCartData() {
    this.error.set("");
    this.isLoading.set(true);
    return this.http.get<any>("cart").pipe(
      tap({
        next: (res) => {
          this._cartData.set([ ...res.data.cart ]);         
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

  addCart(courceId: string) {
    return this.http.post("cart/" + courceId, {})
  }

  removeCartItem(courseId: string) {
    return this.http.delete("cart/" + courseId).pipe(
      tap({
        next: (res) => {
          this._cartData.update(oldData => [ ...oldData.filter((item: any) => item.id !== courseId) ])
        }
      })
    )
  }
}