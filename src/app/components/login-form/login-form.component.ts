import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  email: string = '';
  senha: string = '';

  erroLogin: boolean = false;

  fazerLogin() {
    this.erroLogin = false;
    if (!this.email || !this.senha) {
      this.erroLogin = true;
      return;
    }

    const sucesso = this.authService.login(this.email, this.senha);

    if (sucesso) {

      this.router.navigate(['/feed']);
    } else {

      this.erroLogin = true;
      this.senha = '';
    }
  }
}