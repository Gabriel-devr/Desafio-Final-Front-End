import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-profissional',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cadastro-profissional.component.html',
  styleUrl: './cadastro-profissional.component.scss'
})
export class CadastroProfissionalComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  dados = {
    nome: '',
    especialidade: '',
    registro: '',
    email: '',
    senha: '',
    tipo: 'profissional' as const
  };

  criarConta() {
    if (!this.dados.nome || !this.dados.email || !this.dados.senha || !this.dados.registro) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      this.authService.cadastrar(this.dados);
      alert('Conta profissional criada com sucesso!');
      this.router.navigate(['/feed']);
    } catch (e: any) {
      alert(e.message);
    }
  }
}