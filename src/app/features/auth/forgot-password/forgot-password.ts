import { Component, computed, ElementRef, inject, signal, viewChildren } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { startWith } from "rxjs";

import { FormCard, OtpVerification } from "@shared/components";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { PasswordModule } from "primeng/password";

enum verifyStatus {
  Pending = 'pending',
  Error = 'error',
  Success = 'success'
}

enum ResetStatus {
  Verify = 'verify',
  Send = 'send',
  Password = 'password'
}

function equalPasswords(control:AbstractControl) {
  const p1 = control.value.password;
  const p2 = control.value.confirmPassword;
  
  if (p1 === p2) return null;
  return { passwordsNoEqual: true }
};

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  imports: [
    ReactiveFormsModule,
    FormCard,
    OtpVerification,

    ButtonModule,
    InputTextModule,
    MessageModule,
    PasswordModule,
    DividerModule
  ]
})
export class ForgotPassword {
  location = inject(Location);
  isLoading = signal(false);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  otpVerified = signal<verifyStatus | ''>('');
  isResend = signal(false);
  resetStatus = signal<ResetStatus>(ResetStatus.Send);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    })
  });

  formPasswords = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true
    })
  }, { validators: [equalPasswords] });

  formInputs = viewChildren<ElementRef>('formInput');
  
  password = toSignal(this.formPasswords.controls.password.valueChanges
    .pipe(startWith('')), {
      initialValue: ''
    });

  hasLowercase = computed(() => /[a-z]/.test(this.password() || ''));
  hasUppercase = computed(() => /[A-Z]/.test(this.password() || ''));
  hasNumeric = computed(() => /[0-9]/.test(this.password() || ''));
  hasMinLength = computed(() => (this.password() || '').length >= 8);

  get emailErrors() {
    const control = this.form.controls.email;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('email')) return 'Noto\'g\'ri e-pochta shakli';
    return null;
  };

  get passwordErrors() {
    const control = this.formPasswords.controls.password;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('minlength')) return 'Kamida 8 ta belgi';
    return null;
  };

  get confirmPasswordErrors() {
    const passwordControl = this.formPasswords.controls.password;
    const confirmControl = this.formPasswords.controls.confirmPassword;
    const passwordGroup = this.formPasswords;
    
    if (!confirmControl.touched || !confirmControl.dirty) return null;
    
    if (confirmControl.hasError('required')) return 'Majburiy maydon';
    
    if (passwordControl.value && confirmControl.value && passwordGroup.hasError('passwordsNoEqual')) {
      return 'Parollar mos emas';
    }
    
    return null;
  };

  sendCode() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.resetStatus.set(ResetStatus.Verify);
      this.otpVerified.set(verifyStatus.Success);
    }, 2000);
  };

  onVerifyOtp(code: string) {
    this.otpVerified.set(verifyStatus.Pending)
    console.log(code);
    setTimeout(() => {
      this.otpVerified.set(verifyStatus.Success);
      this.resetStatus.set(ResetStatus.Password)
    }, 2000);
  };

  onUpdatePassword() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('/auth/sign-in')
      this.location.back();
    }, 2000);
  };

  onResenCode() {
    this.isResend.set(true);
    setTimeout(() => {
      this.isResend.set(false)
    }, 2000);
  };
}