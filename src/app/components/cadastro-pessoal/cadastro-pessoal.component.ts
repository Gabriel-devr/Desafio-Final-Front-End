import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-pessoal',
  imports: [RouterLink],
  templateUrl: './cadastro-pessoal.component.html',
  styleUrl: './cadastro-pessoal.component.scss'
})
export class CadastroPessoalComponent {

  router = inject(Router)
  authService = inject(AuthService)

  login() {
    this.authService.login();
    alert("Logado")
    this.router.navigate(['/feed'])
  }

}

