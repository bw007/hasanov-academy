import { computed, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

import type { AuthResponse, SignInData, SignUpData, User } from "@core/models";

@Injectable({ providedIn: "root" })
export class Auth {
  private http = inject(HttpClient);

  private _accessToken = signal<string>("");
  private _user = signal<User | null>(null);

  isAuthenticated = computed(() => !!this._accessToken() && !!this._user());

  accessToken = this._accessToken.asReadonly();
  user = this._user.asReadonly();

  // Get token in storage
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
  verifyEmail(code: string) {
    return this.http.post<AuthResponse>("auth/verify-email", code).pipe(
      tap({
        next: (res) => {
          this.saveUserData(res.data.accessToken, res.data.user);
        }
      })
    );
  };

  // Check email handler
  checkEmail(email: string) {
    return this.http.post("auth/check-email", email);
  }

  // Sign in handler
  signIn(credentials: SignInData) {
    return this.http.post<AuthResponse>("auth/signin", credentials).pipe(
      tap({
        next: (res) => {
          this.saveUserData(res.data.accessToken, res.data.user);
        }
      })
    );
  };

  // Verify user handler
  verifyUser() {
    return this.http.get<User>("auth/verify").pipe(
      tap({
        next: (res) => {
          this._user.set(res);
        }
      })
    )
  };

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
