import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-pessoal',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cadastro-pessoal.component.html',
  styleUrl: './cadastro-pessoal.component.scss'
})
export class CadastroPessoalComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  dados = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'paciente' as const
  };

  criarConta() {
    if (!this.dados.nome || !this.dados.email || !this.dados.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      this.authService.cadastrar(this.dados);
      alert('Conta criada com sucesso! Bem-vindo(a).');
      this.router.navigate(['/feed']);
    } catch (e: any) {
      alert(e.message);
    }
  }
}