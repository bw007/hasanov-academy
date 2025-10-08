import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

import type { AuthResponse, SignInData, SignUpData, User, VerifyOTPData } from "@core/models";

@Injectable({ providedIn: "root" })
export class Auth {
  private http = inject(HttpClient);

  private _accessToken = signal<string>("");
  private _user = signal<User | null>(null);

  isAuthenticated = computed(() => !!this._accessToken() && !!this._user());

  accessToken = this._accessToken.asReadonly();
  user = this._user.asReadonly();

  // Get token on storage
  constructor() {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      this._accessToken.set(savedToken);
      this.verifyUser().subscribe({
        error: () => this.removeUserData()
      })
    }
  }

  // Sign up handler
  signUp(credentials: SignUpData) {
    return this.http.post("auth/signup", credentials);
  };

  // Verify email handler
  verifyEmail(fields: VerifyOTPData) {
    return this.http.post<AuthResponse>("auth/verify-otp", fields).pipe(
      tap({
        next: (res) => {
          this.saveUserData(res.data.accessToken, res.data.user);
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
    return this.http.post<AuthResponse | any>("auth/signin", credentials).pipe(
      tap({
        next: (res) => {
          this.saveUserData(res.data.accessToken, res.data.user);
        }
      }),
    );
  };

  // Verify user handler
  verifyUser() {
    return this.http.get<AuthResponse>("auth/verify").pipe(
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
          this.removeUserData();
        }
      })
    )
  }

  // Remove user data
  private removeUserData() {
    this._accessToken.set("");
    localStorage.removeItem("access_token");
    this._user.set(null);
  }

  // Save user data
  private saveUserData(token: string, userData: User) {
    this._accessToken.set(token);
    localStorage.setItem("access_token", token);
    this._user.set(userData);
  }
}
