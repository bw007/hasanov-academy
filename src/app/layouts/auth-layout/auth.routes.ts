import { Routes } from "@angular/router";
import { SignIn } from "@features/auth/sign-in/sign-in";

export const AUTH_ROUTES: Routes = [
  { path: "", redirectTo: "sign-in", pathMatch: "full" },
  { 
    path: "sign-in", 
    component: SignIn
  },
  { 
    path: "sign-up", 
    loadComponent: () => import("@features/auth/sign-up/sign-up").then(m => m.SignUp)
  },
  { 
    path: "verify-email", 
    loadComponent: () => import("@features/auth/verify-email/verify-email").then(m => m.VerifyEmail)
  },
  { 
    path: "forgot-password",
    redirectTo: 'sign-in'
    // loadComponent: () => import("@features/auth/forgot-password/forgot-password").then(m => m.ForgotPassword)
  },
];