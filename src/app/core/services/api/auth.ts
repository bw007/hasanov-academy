import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

import { UserRole, type ApiResponseT, type AuthData, type SignInData, type SignUpData, type User, type VerifyOTPData } from "@core/models";

@Injectable({ providedIn: "root" })
export class Auth {
  private http = inject(HttpClient);
  roles = UserRole;

  private _user = signal<User | null>(null);

  isAuthenticated = computed(() => !!this._user());
  isAdmin = computed(() => this._user()?.role === this.roles.Admin);
  isStudent = computed(() => this._user()?.role === this.roles.Student);
  
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
          this.saveToken(res.data.accessToken, res.data.refreshToken);
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
          this.saveToken(res.data.accessToken, res.data.refreshToken);
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

  refreshToken(refreshToken: string) {
    return this.http.post<any>("auth/refresh-token", { refreshToken }).pipe(
      tap({
        next: (res) => {
          this.saveToken(res.data.accessToken, res.data.refreshToken)
        }
      })
    )
  }

  // Resent OTP code
  resendOTP(email: string) {
    return this.http.post<any>("auth/resend-otp", { email });
  }

  // Sign out handler
  signOut() {
    return this.http.post("auth/logout", {}).pipe(
      tap({
        next: () => {
          this._user.set(null);
          this.removeToken();
        }
      })
    )
  }

  // Save storage
  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem("r_token", refreshToken);
    localStorage.setItem("a_token", accessToken);
  }

  removeToken() {
    localStorage.removeItem("a_token");
    localStorage.removeItem("r_token");
  }
}
