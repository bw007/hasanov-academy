import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '../api';

@Injectable({ providedIn: 'root' })
export class Token {
  private auth = inject(Auth);
  private _accessToken = signal<string>("");
  accessToken = this._accessToken.asReadonly();

  constructor() {    
    const token = localStorage.getItem("access_token");
    if (token) {
      this.saveToken(token);
      this.auth.verifyUser().subscribe();
    }
  }

  saveToken(token: string) {
    localStorage.setItem("access_token", token);
    this._accessToken.set(token);
  }
}