import { Component, computed, DestroyRef, ElementRef, inject, signal, viewChildren } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { finalize } from "rxjs";

import { Auth } from "@core/services/api/auth";
import { Notification } from "@core/services/common";
import { AuthType } from "@core/models";

import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { AutoFocusModule } from "primeng/autofocus";
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from "primeng/message";

import { FormCard } from "@shared/components";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.html",
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormCard,

    MessageModule,
    ButtonModule,
    InputTextModule,
    DividerModule,
    AutoFocusModule,
    FloatLabelModule,
    PasswordModule,
    CheckboxModule
  ],
})
export class SignIn {
  private dsRef = inject(DestroyRef);
  private auth = inject(Auth);
  private router = inject(Router);
  private notification = inject(Notification);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  formInputs = viewChildren<ElementRef>('formInput');

  loadingState = signal<{ loading: boolean, type: AuthType | '' }>({ loading: false, type: '' });
  isLocalLoading = computed(() => this.loadingState().type === 'submit');
  isOAuthLoading = computed(() => this.loadingState().type === 'click');

  get emailErrors() {
    const control = this.form.controls.email;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('email') || control.hasError('pattern')) return 'Noto\'g\'ri e-pochta shakli';
    return null;
  };

  get passwordErrors() {
    const control = this.form.controls.password;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('minlength')) return 'Kamida 8 ta belgi';
    return null;
  };

  signIn(event: Event) {
    const eventType = event.type;

    // Google signin
    if (eventType === AuthType.Google) {
      this.signInWithGoogle();
      return;
    }

    // Form submit
    if (eventType === AuthType.Email) {
      this.signInWithEmail();
    }
  }

  forgotPass() {
    this.notification.info({
      summary: "Tez orada!",
      message: "Ungacha kalitni esdan chiqarmang"
    })
  }

  private resendOTP() {
    const email = this.form.value.email!;
    const subscription = this.auth.resendOTP(email)
      .subscribe({
        next: () => {
          this.router.navigate(['auth/verify-email'], {
            queryParams: { email }
          });
        }
      });

    this.dsRef.onDestroy(() => subscription.unsubscribe())
  }

  private signInWithEmail() {
    // Form validation
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      
      const invalidInput = this.formInputs().find(input =>
        input.nativeElement.classList.contains('ng-invalid')
      );
      
      invalidInput?.nativeElement.focus();
      return;
    }

    // Sign in
    this.loadingState.set({ loading: true, type: AuthType.Email });

    const subscription = this.auth.signIn({
      email: this.form.value.email!,
      password: this.form.value.password!
    }).pipe(
      finalize(() => {
        this.loadingState.set({ loading: false, type: '' });
      })
    ).subscribe({
      next: (response) => {
        if (response?.code === 'EMAIL_VERIFICATION_REQUIRED') {
          this.notification.info({
            summary: 'Shoshilmang!',
            message: 'E-pochtani tasdiqlash lozim'
          });
          this.resendOTP();
        } else {
          this.notification.success({
            summary: 'Muvaffaqiyat!',
            message: 'Muvaffaqiyatli tizimga kirildi'
          });
          this.router.navigateByUrl('/');
        }
      }
    });

    this.dsRef.onDestroy(() => subscription.unsubscribe());
  }

  private signInWithGoogle() {
    this.loadingState.set({ loading: true, type: AuthType.Google });
    this.form.markAsPristine();
    // TODO: Implement Google OAuth
    this.notification.info({
      summary: 'Tez orada!',
      message: 'Yaqin vaqtlar ichida ushbu xizmat qo\'shiladi'
    });
    setTimeout(() => {
      this.loadingState.set({ loading: false, type: '' });
    }, 1000);
  }
}
