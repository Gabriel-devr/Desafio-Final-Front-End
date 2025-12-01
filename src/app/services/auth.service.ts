import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = signal<boolean>(localStorage.getItem('user_logged_in') === 'true');

  login() {
    this.isLogged.set(true);
    // 2. Salva no navegador que o usuário está logado
    localStorage.setItem('user_logged_in', 'true');
  }

  logout() {
    this.isLogged.set(false);
    // 3. Remove a informação do navegador ao sair
    localStorage.removeItem('user_logged_in');
  }
}
