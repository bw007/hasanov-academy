import { Routes } from '@angular/router';
import { AuthLayout, MainLayout } from './layouts';
import { SignIn } from '@features/auth/sign-in/sign-in';
import { SignUp } from '@features/auth/sign-up/sign-up';
import { VerifyEmail } from '@features/auth/verify-email/verify-email';
import { ForgotPassword } from '@features/auth/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'sign-in',
        component: SignIn
      },
      {
        path: 'sign-up',
        component: SignUp
      },
      {
        path: 'verify-email',
        component: VerifyEmail
      },
      {
        path: 'forgot-password',
        component: ForgotPassword
      }
    ]
  }
];
