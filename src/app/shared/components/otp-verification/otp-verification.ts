import { Component, computed, input, output, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { ButtonModule } from "primeng/button";
import { InputOtpModule } from "primeng/inputotp";
import { MessageModule } from "primeng/message";
import { InputNumberModule } from "primeng/inputnumber";

@Component({
  selector: "app-otp-verification",
  templateUrl: "./otp-verification.html",
  imports: [
    ReactiveFormsModule,
    InputOtpModule,
    MessageModule,
    ButtonModule,
    InputNumberModule,
  ]
})
export class OtpVerification {
  verifyHandle = output<string>();
  verified = input.required<string>();
  submitted = signal(false);
  verify = computed(() => this.verified());
  resendHandle = output();
  resend = input.required();

  isResend = computed(() => this.resend());

  form = new FormGroup({
    code: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get codeErrors() {
    const control = this.form.controls.code;
    if (!control.touched || !control.dirty || control.valid) return null;

    if (control.hasError("required")) return "Majburiy maydon";
    if (control.hasError("minlength")) return "6 ta belgidan iborat";
    return null;
  };

  get verifyError() {
    if (this.verify() === "error") return "Kalit xato";
    return null;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.set(true);
    this.form.controls.code.setErrors(null);

    this.verifyHandle.emit(this.form.value.code || "");
  };

  isInvalid() {
    const control = this.form.controls.code;
    return control.invalid && control.touched || 
      this.verify() === 'error' && this.submitted();
  };

  onResendCode() {
    this.form.reset();
    this.submitted.set(false);
    this.resendHandle.emit();
  }
}
