import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, tap } from "rxjs";

import type { ApiResponseT, AuthData, SignInData, SignUpData, User, VerifyOTPData } from "@core/models";

@Injectable({ providedIn: "root" })
export class Auth {
  private http = inject(HttpClient);

  private _user = signal<User | null>(null);

  isAuthenticated = computed(() => !!this._user());
  user = this._user.asReadonly();

  // Sign up handler
  signUp(credentials: SignUpData) {
    return this.http.post("auth/signup", credentials);
  };

  // Verify email handler
  verifyEmail(fields: VerifyOTPData) {
    return this.http.post<ApiResponseT<AuthData>>("auth/verify-otp", fields).pipe(
      tap({
        next: (res) => {
          this.saveToken(res.data.accessToken);
          this._user.set(res.data.user);
        }
      })
    );
  };

  // Check email handler
  checkEmail(email: string) {
    return this.http.get<any>("auth/check-email", {
      params: { email }
    }).pipe(map((res) => res.data.isAvailable));
  }

  // Sign in handler
  signIn(credentials: SignInData) {
    return this.http.post<ApiResponseT<AuthData> | any>("auth/signin", credentials).pipe(
      tap({
        next: (res) => {
          this.saveToken(res.data.accessToken);
          this._user.set(res.data.user);
        }
      }),
    );
  };

  // Verify user handler
  verifyUser() {
    return this.http.get<ApiResponseT<AuthData>>("auth/verify").pipe(
      tap({
        next: (res) => {
          this._user.set(res.data.user);
        }
      })
    )
  };

  // Resent OTP code
  resendOTP(email: string) {
    return this.http.post<any>("auth/resend-otp", { email });
  }

  // Sign out handler
  signOut() {
    return this.http.post("auth/sign-out", {}).pipe(
      tap({
        next: () => {
          this._user.set(null);
        }
      })
    )
  }

  // Save storage
  saveToken(token: string) {
    localStorage.setItem("access_token", token);
  }
}
