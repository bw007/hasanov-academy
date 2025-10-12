import { Routes } from "@angular/router";
import { AuthGuard, SignOutGuard } from "@core/guards";
import { SignIn } from "@features/auth/sign-in/sign-in";

export const AUTH_ROUTES: Routes = [
  { path: "", redirectTo: "sign-in", pathMatch: "full" },
  { 
    path: "sign-in",
    canActivate: [AuthGuard],
    component: SignIn
  },
  { 
    path: "sign-up",
    canActivate: [AuthGuard],
    loadComponent: () => import("@features/auth/sign-up/sign-up").then(m => m.SignUp)
  },
  { 
    path: "verify-email",
    canActivate: [AuthGuard],
    loadComponent: () => import("@features/auth/verify-email/verify-email").then(m => m.VerifyEmail)
  },
  { 
    path: "forgot-password",
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: "sign-out",
    pathMatch: 'full',
    canActivate: [SignOutGuard],
    loadComponent: () => import("@features/auth/sign-out").then(c => c.SignOut)
  }
];