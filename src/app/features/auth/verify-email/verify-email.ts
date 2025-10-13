import { Component, DestroyRef, inject, input, signal } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { ButtonModule } from "primeng/button";
import { InputOtpModule } from "primeng/inputotp"
import { FormsModule } from "@angular/forms";

import { FormCard, OtpVerification } from "@shared/components";
import { Auth } from "@core/services/api";
import { catchError, finalize, throwError } from "rxjs";
import { Notification } from "@core/services/common";

enum verifyStatus {
  Pending = 'pending',
  Error = 'error',
  Success = 'success'
}

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.html',
  imports: [
    FormCard,
    InputOtpModule,
    ButtonModule,
    FormsModule,
    OtpVerification,
  ]
})
export class VerifyEmail {
  private router = inject(Router);
  private dsRef = inject(DestroyRef);
  protected readonly location = inject(Location);
  private auth = inject(Auth);
  private notification = inject(Notification);

  email = input.required<string>();

  otpVerified = signal<verifyStatus | ''>('');
  isResend = signal(false);

  onVerifyOtp(code: string) {
    this.otpVerified.set(verifyStatus.Pending)
    const subscription = this.auth.verifyEmail({
      email: this.email()!,
      otp: code!
    }).pipe(
      catchError(error => {
        this.otpVerified.set(verifyStatus.Error);
        return throwError(() => error);
      })
    ).subscribe({
      next: () => {
        this.otpVerified.set(verifyStatus.Success);
        this.notification.success({
          summary: 'Ofarin!',
          message: 'Muvaffaqiyatli tizimga kirdingiz.'
        });
        this.router.navigateByUrl('/')
      }
    });

    this.dsRef.onDestroy(() => subscription.unsubscribe());
  }

  onResenCode() {
    this.isResend.set(true);
    const subscription = this.auth.resendOTP(this.email())
      .pipe(
        finalize(() => {
          this.isResend.set(false);
        })
      ).subscribe({
        next: () => {
          this.notification.success({
            summary: 'Yuborildi',
            message: 'E-pochtani ko\'zdan kechiring'
          })
        }  
      });

    this.dsRef.onDestroy(() => subscription.unsubscribe());
  }
}