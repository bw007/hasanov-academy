import { Component, computed, ElementRef, inject, signal, viewChildren } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)]
    })
  });

  formInputs = viewChildren<ElementRef>('formInput');

  loadingState = signal({ loading: false, type: '' });
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
    }
    if (this.form.valid || event.type === 'click') {
      this.form.markAsPristine();
      this.loadingState.set({ loading: true, type: event.type });
      setTimeout(() => {
        this.loadingState.set({ loading: false, type: '' });
        this.router.navigate(['/']);
      }, 3000);
    }
  };
}
