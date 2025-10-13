import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "@core/services/api";
import { Notification } from "@core/services/common";
import { finalize } from "rxjs";

@Component({
  selector: 'app-sign-out',
  template: ""
})
export class SignOut implements OnInit {
  private dsRef = inject(DestroyRef);
  private auth = inject(Auth);
  private router = inject(Router);
  private notification = inject(Notification);

  ngOnInit(): void {
    const subscription = this.auth.signOut().pipe(
      finalize(() => {
        this.router.navigateByUrl("/");
        this.notification.info({
          summary: "Chiqish",
          message: "Tizimdan chiqdingiz!"
        })
      })
    ).subscribe();

    this.dsRef.onDestroy(() => subscription.unsubscribe());
  }
}