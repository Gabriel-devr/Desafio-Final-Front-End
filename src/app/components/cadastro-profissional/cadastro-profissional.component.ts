import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-profissional',
  imports: [],
  templateUrl: './cadastro-profissional.component.html',
  styleUrl: './cadastro-profissional.component.scss'
})
export class CadastroProfissionalComponent {

  router = inject(Router)

  login() {
    alert("Logado")
    this.router.navigate(['/feed'])
  }
}
