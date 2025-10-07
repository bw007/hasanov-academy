import { Component, computed, DestroyRef, ElementRef, inject, signal, viewChildren } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

import { DividerModule } from "primeng/divider";
import { ButtonModule } from "primeng/button";
import { AutoFocusModule } from "primeng/autofocus";
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';

import { FormCard } from "@shared/components";
import { MessageModule } from "primeng/message";
import { Auth } from "@core/services/api/auth";
import { finalize } from "rxjs";
import { Notification } from "@core/services/common";

enum AuthType {
  Email = 'submit',
  Google = 'click'
}

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
  private router = inject(Router);
  private dsRef = inject(DestroyRef);
  private auth = inject(Auth);
  private notification = inject(Notification);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
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
    if (control.hasError('email')) return 'Noto\'g\'ri e-pochta shakli';
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

  private signInWithEmail() {
    // Form validation
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      
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
      next: () => {
        this.notification.success({
          summary: 'Welcome!',
          message: 'Successfully signed in'
        });
        this.router.navigateByUrl('/');
      }
    });

    this.dsRef.onDestroy(() => subscription.unsubscribe());
  }

  private signInWithGoogle() {
    this.loadingState.set({ loading: true, type: AuthType.Email });

    // TODO: Implement Google OAuth
    setTimeout(() => {
      this.loadingState.set({ loading: false, type: '' });
    }, 1000);
  }
}
