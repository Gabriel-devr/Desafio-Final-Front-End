import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = signal(false);

  login() {
    this.isLogged.set(true);
  }

  logout() {
    this.isLogged.set(false);
  }
}
