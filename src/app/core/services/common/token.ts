import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '../api';

@Injectable({ providedIn: 'root' })
export class Token {
  private auth = inject(Auth);
  private _accessToken = signal<string>("");
  accessToken = this._accessToken.asReadonly();

  constructor() {    
    const accessToken = localStorage.getItem("a_token");
    
    if (accessToken) {
      this.saveToken(accessToken);
      this.auth.verifyUser().subscribe();
    }
  }

  saveToken(token: string) {
    localStorage.setItem("a_token", token);
    this._accessToken.set(token);
  }
}