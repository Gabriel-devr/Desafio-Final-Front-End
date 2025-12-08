import { Injectable, inject, signal } from '@angular/core';
import { DataService, Usuario } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dataService = inject(DataService);
  private router = inject(Router);

  usuarioLogado = signal<Usuario | null>(this.getUsuarioSalvo());

  isLogged = signal<boolean>(!!this.getUsuarioSalvo());

  login(email: string, senha: string): boolean {
    const usuarioEncontrado = this.dataService.usuarios().find(
      u => u.email === email && u.senha === senha
    );

    if (usuarioEncontrado) {
      this.setSessao(usuarioEncontrado);
      return true;
    }
    return false;
  }

  cadastrar(usuario: Usuario) {
    const existe = this.dataService.usuarios().some(u => u.email === usuario.email);
    if (existe) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    this.dataService.adicionarUsuario(usuario);
    this.setSessao(usuario);
  }

  logout() {
    this.usuarioLogado.set(null);
    this.isLogged.set(false);
    localStorage.removeItem('user_session');
    this.router.navigate(['/login']);
  }

  private setSessao(usuario: Usuario) {
    this.usuarioLogado.set(usuario);
    this.isLogged.set(true);
    localStorage.setItem('user_session', JSON.stringify(usuario));
  }

  private getUsuarioSalvo(): Usuario | null {
    const salvo = localStorage.getItem('user_session');
    return salvo ? JSON.parse(salvo) : null;
  }
}