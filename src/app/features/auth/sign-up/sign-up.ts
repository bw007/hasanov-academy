import { Component, computed, DestroyRef, ElementRef, inject, OnInit, signal, viewChildren } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, delay, finalize, map, of, startWith, switchMap } from "rxjs";

import { Auth } from "@core/services/api";
import { Notification } from "@core/services/common";
import { AuthType } from "@core/models";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DividerModule } from "primeng/divider";
import { AutoFocusModule } from "primeng/autofocus";
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from "primeng/message";
import { FormCard } from "@shared/components";

let initialNameValue = '', initialEmailValue = '';
const savedForm = window.localStorage.getItem('sign-up-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialNameValue = loadedForm.name;
  initialEmailValue = loadedForm.email;
};

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.html",
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormCard,

    ButtonModule,
    InputTextModule,
    MessageModule,
    DividerModule,
    AutoFocusModule,
    FloatLabelModule,
    PasswordModule
],
})
export class SignUp implements OnInit{
  private dsRef = inject(DestroyRef);
  private router = inject(Router);
  private auth = inject(Auth);
  private notification = inject(Notification);

  form = new FormGroup({
    name: new FormControl(initialNameValue, {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
    }),
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)],
      asyncValidators: [(control) => this.emailIsUnique(control)],
      updateOn: 'blur'
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required]
      })
    }, {
      validators: [this.equalPasswords]
    })
  });

  formInputs = viewChildren<ElementRef>('formInput');
  
  password = toSignal(this.form.controls.passwords.controls.password.valueChanges
    .pipe(startWith('')), {
      initialValue: ''
    });

  hasLowercase = computed(() => /[a-z]/.test(this.password() || ''));
  hasUppercase = computed(() => /[A-Z]/.test(this.password() || ''));
  hasNumeric = computed(() => /[0-9]/.test(this.password() || ''));
  hasMinLength = computed(() => (this.password() || '').length >= 8);

  loadingState = signal({ loading: false, type: '' });
  isLocalLoading = computed(() => this.loadingState().type === 'submit');
  isOAuthLoading = computed(() => this.loadingState().type === 'click');

  get nameErrors() {
    const control = this.form.controls.name;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('minlength')) return 'Kamida 3 ta belgi';
    if (control.hasError('maxlength')) return 'Ko\'pi bilan 50 ta belgi';
    return null;
  };

  get emailErrors() {
    const control = this.form.controls.email;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('email') || control.hasError('pattern')) return 'Noto\'g\'ri e-pochta shakli';
    if (control.hasError('emailTaken')) return 'Bu email allaqachon ro\'yxatdan o\'tgan';
    return null;
  };

  get emailChecking() {
    return this.form.controls.email.status === 'PENDING';
  };

  get emailUnique() {
    const control = this.form.controls.email;
    return control.status === 'VALID' && control.touched && control.value;
  }

  get passwordErrors() {
    const control = this.form.controls.passwords.controls.password;
    if (!control.touched || !control.dirty || control.valid) return null;
    
    if (control.hasError('required')) return 'Majburiy maydon';
    if (control.hasError('minlength')) return 'Kamida 8 ta belgi';
    return null;
  };

  get confirmPasswordErrors() {
    const passwordControl = this.form.controls.passwords.controls.password;
    const confirmControl = this.form.controls.passwords.controls.confirmPassword;
    const passwordGroup = this.form.controls.passwords;
    
    if (!confirmControl.touched || !confirmControl.dirty) return null;
    
    if (confirmControl.hasError('required')) return 'Majburiy maydon';
    
    if (passwordControl.value && confirmControl.value && passwordGroup.hasError('passwordsNoEqual')) {
      return 'Parollar mos emas';
    }
    
    return null;
  };

  ngOnInit(): void {
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('sign-up-form', JSON.stringify(value))
      }
    });

    this.dsRef.onDestroy(() => subscription.unsubscribe());
  };

  private equalPasswords(control:AbstractControl) {
    const p1 = control.value.password;
    const p2 = control.value.confirmPassword;
    
    if (p1 === p2) return null;
    return { passwordsNoEqual: true }
  };

  private emailIsUnique(control: AbstractControl) {
    if (!control.value) return of(null);

    return of(null).pipe(
      delay(500),
      switchMap(() => this.auth.checkEmail(control.value)),
      map((isAvailable: boolean) => {          
        if (!isAvailable) {
          return { emailTaken: true };
        }
          
        return null;
      })
    );
  }

  signUp(event: Event) {
    const eventType = event.type;

    // Google signin
    if (eventType === AuthType.Google) {
      this.signInWithGoogle();
      return;
    }

    // Form submit
    if (eventType === AuthType.Email) {
      this.signUpWithEmail();
    }
  }
  
  private signUpWithEmail() {   
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
    const email = this.form.value.email!;
    const subscription = this.auth.signUp({
      email,
      name: this.form.value.name!,
      password: this.form.value.passwords?.password!
    }).pipe(
      finalize(() => {
        this.loadingState.set({ loading: false, type: '' });
      })
    ).subscribe({
      next: () => {
        this.notification.success({
          summary: 'Qoyilmaqom, siz zo\'rsiz!',
          message: 'E-pochtani tasdiqlang va tizimga kiring.'
        });
        this.router.navigate(['auth/verify-email'], {
          queryParams: { email }
        });
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

  onReset() {
    this.form.reset();
    localStorage.removeItem('sign-up-form');
  };

  onValid(eventType: string) {
    this.form.markAsPristine();
    this.loadingState.set({ loading: true, type: eventType });
  }
}
