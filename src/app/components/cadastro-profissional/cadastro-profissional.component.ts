import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-profissional',
  imports: [],
  templateUrl: './cadastro-profissional.component.html',
  styleUrl: './cadastro-profissional.component.scss'
})
export class CadastroProfissionalComponent {

  router = inject(Router)
  authService = inject(AuthService)

  login() {
    this.authService.login();
    alert("Logado")
    this.router.navigate(['/feed'])
  }
}
