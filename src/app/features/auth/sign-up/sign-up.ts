import { Component, computed, DestroyRef, ElementRef, inject, OnInit, signal, viewChildren } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, delay, map, of, startWith } from "rxjs";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DividerModule } from "primeng/divider";
import { AutoFocusModule } from "primeng/autofocus";
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from "primeng/message";

import { FormCard } from "@shared/components";

let initialNameValue = '', initialEmailValue = '', initialPass = '';
const savedForm = window.localStorage.getItem('sign-up-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialNameValue = loadedForm.name;
  initialEmailValue = loadedForm.email;
  initialPass = loadedForm.passwords.password;
};

function equalPasswords(control:AbstractControl) {
  const p1 = control.value.password;
  const p2 = control.value.confirmPassword;
  
  if (p1 === p2) return null;
  return { passwordsNoEqual: true }
};

function emailIsUnique(control:AbstractControl) {
  if (!control.value) return of(null);
  const db = ['test@gmail.com', 'test1@mail.ru'];

  return of(null).pipe(
    delay(3000),
    map(() => {
      if (!db.includes(control.value)) return null;
      return { emailTaken: true }
    })
  )
}

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
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  form = new FormGroup({
    name: new FormControl(initialNameValue, {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
    }),
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
      updateOn: 'blur'
    }),
    passwords: new FormGroup({
      password: new FormControl(initialPass, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
      confirmPassword: new FormControl(initialPass, {
        validators: [Validators.required]
      })
    }, {
      validators: [equalPasswords]
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
    if (control.hasError('email')) return 'Noto\'g\'ri e-pochta shakli';
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

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  };

  signUp(event: Event) {
    if (this.form.invalid && event.type === 'submit') {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();

      const invalidInput = this.formInputs().find(input => 
        input.nativeElement.classList.contains('ng-invalid')
      );

      if (invalidInput) {
        invalidInput.nativeElement.focus();
      }
      return;
    };

    this.onValid(event.type);

    if (this.form.valid && event.type === 'submit') {
      setTimeout(() => {
        this.loadingState.set({ loading: false, type: '' });
        console.log(111111111111);
        
        this.router.navigate(['/auth/verify-email'], {
          queryParams: { email: this.form.controls.email.value }
        });
        // this.onReset();
      }, 3000);
    };

    if (event.type === 'click') {
      setTimeout(() => {
        this.loadingState.set({ loading: false, type: '' });
        this.router.navigate(['/']);
        // this.onReset();
      }, 3000);
    };
  };

  onReset() {
    this.form.reset();
    localStorage.removeItem('sign-up-form');
  };

  onValid(eventType: string) {
    this.form.markAsPristine();
    this.loadingState.set({ loading: true, type: eventType });
  }
}
