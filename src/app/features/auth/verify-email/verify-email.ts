import { Component, inject, input, signal } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { ButtonModule } from "primeng/button";
import { InputOtpModule } from "primeng/inputotp"
import { FormsModule } from "@angular/forms";

import { FormCard, OtpVerification } from "@shared/components";

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
  location = inject(Location);

  email = input<string>();

  otpVerified = signal<verifyStatus | ''>('');
  isResend = signal(false);

  onVerifyOtp(code: string) {
    this.otpVerified.set(verifyStatus.Pending)
    console.log(code);
    setTimeout(() => {
      this.otpVerified.set(verifyStatus.Error);
    }, 2000);
    
  }

  onResenCode() {
    this.isResend.set(true);
    setTimeout(() => {
      this.isResend.set(false)
    }, 2000);
  }

  signIn() {
    
  }
}