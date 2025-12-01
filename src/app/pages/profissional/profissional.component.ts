import { Component } from '@angular/core';
import { Profissional } from '../../models/profissional';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profissional',
  imports: [FormsModule, CommonModule],
  templateUrl: './profissional.component.html',
  styleUrl: './profissional.component.scss'
})
export class ProfissionalComponent {
  termoBusca: string = '';
  filtroEspecialidade: string = 'Todos';
  exibirFormularioCadastro: boolean = false;

  profissionais: Profissional[] = [
    {
      id: 1,
      nome: 'Dra. Helena Costa',
      especialidade: 'Reumatologista',
      registro: 'CRM/SP 123456',
      descricao: 'Especialista em dor crônica e fibromialgia com abordagem integrativa e humanizada.',
      localizacao: 'São Paulo, SP (Online)',
      avaliacao: 4.9,
      foto: 'assets/pexels-gabby-k-7114420.jpg',
      telefone: '11999998888',
      email: 'helena@email.com',
      verificado: true
    },
    {
      id: 2,
      nome: 'Dr. Marcos Silva',
      especialidade: 'Fisioterapeuta',
      registro: 'CREFITO 45678',
      descricao: 'Reabilitação funcional focada em alívio de dores musculares e fortalecimento leve.',
      localizacao: 'Rio de Janeiro, RJ',
      avaliacao: 4.8,
      foto: '',
      telefone: '21999997777',
      email: 'marcos@email.com',
      verificado: true
    },
    {
      id: 3,
      nome: 'Clara Mendes',
      especialidade: 'Psicólogo',
      registro: 'CRP 06/12345',
      descricao: 'Terapia cognitivo-comportamental (TCC) para gestão da dor e controle da ansiedade.',
      localizacao: 'Online',
      avaliacao: 5.0,
      foto: '',
      telefone: '11988888888',
      email: 'clara@email.com',
      verificado: false
    },
    {
      id: 4,
      nome: 'Dra. Juliana Paes',
      especialidade: 'Nutricionista',
      registro: 'CRN 54321',
      descricao: 'Nutrição anti-inflamatória personalizada para pacientes com doenças autoimunes e fibromialgia.',
      localizacao: 'Salvador, BA (Online)',
      avaliacao: 4.9,
      foto: '',
      telefone: '71999996666',
      email: 'juliana.nutri@email.com',
      verificado: true
    },
    {
      id: 5,
      nome: 'Dr. Roberto Campos',
      especialidade: 'Psiquiatra',
      registro: 'CRM/MG 987654',
      descricao: 'Acompanhamento psiquiátrico com foco em transtornos de humor associados à dor crônica.',
      localizacao: 'Belo Horizonte, MG',
      avaliacao: 4.7,
      foto: '',
      telefone: '31999995555',
      email: 'roberto.psiq@email.com',
      verificado: true
    },
    {
      id: 6,
      nome: 'Ana Beatriz Souza',
      especialidade: 'Fisioterapeuta',
      registro: 'CREFITO 11223',
      descricao: 'Especialista em Pilates clínico e hidroterapia para alívio de tensões.',
      localizacao: 'Curitiba, PR',
      avaliacao: 5.0,
      foto: '',
      telefone: '41999994444',
      email: 'ana.fisio@email.com',
      verificado: false
    },
    {
      id: 7,
      nome: 'Lucas Oliveira',
      especialidade: 'Psicólogo',
      registro: 'CRP 05/67890',
      descricao: 'Psicologia positiva e mindfulness para lidar com o diagnóstico e crises de dor.',
      localizacao: 'Online',
      avaliacao: 4.8,
      foto: '',
      telefone: '21999993333',
      email: 'lucas.psi@email.com',
      verificado: true
    },
    {
      id: 8,
      nome: 'Dra. Fernanda Lima',
      especialidade: 'Reumatologista',
      registro: 'CRM/RS 111222',
      descricao: 'Diagnóstico preciso e tratamento contínuo para fibromialgia e fadiga crônica.',
      localizacao: 'Porto Alegre, RS',
      avaliacao: 4.6,
      foto: '',
      telefone: '51999992222',
      email: 'fernanda.reumato@email.com',
      verificado: true
    }
  ];

  novoProfissional: Partial<Profissional> = {
    especialidade: 'Reumatologista',
    localizacao: ''
  };

  especialidades = ['Todos', 'Reumatologista', 'Psicólogo', 'Fisioterapeuta', 'Nutricionista', 'Psiquiatra'];

  get profissionaisFiltrados(): Profissional[] {
    return this.profissionais.filter(p => {
      const matchTexto = p.nome.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
        p.descricao.toLowerCase().includes(this.termoBusca.toLowerCase());
      const matchEspecialidade = this.filtroEspecialidade === 'Todos' || p.especialidade === this.filtroEspecialidade;

      return matchTexto && matchEspecialidade;
    });
  }

  toggleCadastro() {
    this.exibirFormularioCadastro = !this.exibirFormularioCadastro;

    if (this.exibirFormularioCadastro) {

      setTimeout(() => {
        const formElement = document.getElementById('form-section');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  cadastrarServico() {
    if (!this.novoProfissional.nome || !this.novoProfissional.registro || !this.novoProfissional.telefone) {
      alert('Por favor, preencha Nome, Registro e Telefone (WhatsApp) para que pacientes possam te contatar.');
      return;
    }

    const novoId = this.profissionais.length > 0 ? Math.max(...this.profissionais.map(p => p.id)) + 1 : 1;

    const profissionalCompleto: Profissional = {
      id: novoId,
      nome: this.novoProfissional.nome,
      especialidade: this.novoProfissional.especialidade as any,
      registro: this.novoProfissional.registro,
      descricao: this.novoProfissional.descricao || 'Profissional disponível para atendimento.',
      localizacao: this.novoProfissional.localizacao || 'Atendimento Online',
      avaliacao: 5.0,
      foto: '',
      telefone: this.limparTelefone(this.novoProfissional.telefone),
      email: this.novoProfissional.email || '',
      verificado: false
    };


    this.profissionais.unshift(profissionalCompleto);

    alert(`Parabéns, ${this.novoProfissional.nome}! Seu serviço foi divulgado na nossa rede.`);
    this.exibirFormularioCadastro = false;
    this.resetarFormulario();


    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  contatar(profissional: Profissional) {
    if (!profissional.telefone) {
      alert('Este profissional não disponibilizou um número de contato direto.');
      return;
    }

    const mensagem = `Olá, Dr(a). ${profissional.nome}. Vi seu perfil no FibroConnect e gostaria de agendar uma consulta.`;
    const numero = this.limparTelefone(profissional.telefone);

    const linkWhatsapp = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsapp, '_blank');
  }

  private limparTelefone(telefone: string): string {
    return telefone.replace(/\D/g, '');
  }

  private resetarFormulario() {
    this.novoProfissional = {
      especialidade: 'Reumatologista',
      localizacao: ''
    };
  }
}
