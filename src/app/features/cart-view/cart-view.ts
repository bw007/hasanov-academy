import { Component, computed, DestroyRef, inject, linkedSignal, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { Auth, Cart } from "@core/services/api";
import { CourseCardComponent } from "@shared/components/course-card/course-card";
import { ButtonModule } from "primeng/button";
import { MessageModule } from "primeng/message";
import { tap } from "rxjs";

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.html',
  imports: [
    CourseCardComponent,
    ButtonModule,
    RouterLink,
    MessageModule
  ]
})
export class CartView implements OnInit {
  private dsRef = inject(DestroyRef);
  private cart = inject(Cart);
  private auth = inject(Auth);

  cartData = linkedSignal(() => this.cart.cartData());
  priceSumm = computed(() => 
    this.cart.cartData()?.reduce((acc: number, item: any) => acc + item.price, 0)
  );

  isLoading = this.cart.isLoading;
  error = this.cart.error;

  ngOnInit(): void {
    this.cart.getAllCartData().pipe(takeUntilDestroyed(this.dsRef)).subscribe();
  }

  removeFromCart(id: string) {
    this.cart.removeCartItem(id)
      .pipe(
        tap(res => {
          this.auth.verifyUser().pipe(takeUntilDestroyed(this.dsRef)).subscribe();
        }),
        takeUntilDestroyed(this.dsRef)
      )
      .subscribe()
  }
}