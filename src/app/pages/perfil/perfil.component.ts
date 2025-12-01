import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RegistroDiario } from '../../models/registro-diario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Agendamento } from '../../models/agendamento';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  @ViewChild('carousel') carousel!: ElementRef;
  usuario = {
    nome: 'Rondineli Andrade',
    email: 'rondineli@email.com',
    diagnostico: 'Fibromialgia diagnosticada em 2022',
    bio: 'Buscando qualidade de vida através de exercícios leves e meditação.'
  };

  // Variáveis do Formulário (Novo Registro)
  novoRegistro: RegistroDiario = {
    data: new Date(),
    nivelDor: 3,
    nivelFadiga: 4,
    humor: 'neutro',
    notas: ''
  };

  exibirFormAgendamento = false;

  novoAgendamento: Agendamento = {
    titulo: '', data: '', horario: '', local: '', tipo: 'consulta'
  };

  listaAgendamentos: Agendamento[] = [
    {
      titulo: 'Reumatologista',
      data: '2025-06-15',
      horario: '14:00',
      local: 'Clínica Saúde',
      tipo: 'consulta'
    },
    {
      titulo: 'Pilates',
      data: '2025-06-18',
      horario: '09:00',
      local: 'Studio Vital',
      tipo: 'terapia'
    },
    {
      titulo: 'Exame de Sangue',
      data: '2025-06-20',
      horario: '07:30',
      local: 'Lab. Central',
      tipo: 'exame'
    }
  ];

  // Histórico de Registros (Dados Iniciais)
  historico: RegistroDiario[] = [
    {
      data: new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem
      nivelDor: 4,
      nivelFadiga: 5,
      humor: 'triste',
      notas: 'Senti um pouco de dor nas costas após o trabalho.'
    },
    {
      data: new Date(new Date().setDate(new Date().getDate() - 2)), // Anteontem
      nivelDor: 2,
      nivelFadiga: 3,
      humor: 'feliz',
      notas: 'Caminhada leve ajudou bastante hoje.'
    }
  ];

  alternarFormAgendamento() {
    this.exibirFormAgendamento = !this.exibirFormAgendamento;
  }

  salvarAgendamento() {
    if (!this.novoAgendamento.titulo || !this.novoAgendamento.data) {
      alert('Preencha pelo menos o título e a data.');
      return;
    }
    this.listaAgendamentos.unshift({ ...this.novoAgendamento });

    this.novoAgendamento = { titulo: '', data: '', horario: '', local: '', tipo: 'consulta' };
    this.exibirFormAgendamento = false;
  }

  scrollCarousel(direction: number) {
    if (this.carousel) {
      const container = this.carousel.nativeElement;
      const scrollAmount = 240;
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }
  getCorAgendamento(tipo: string): string {
    switch (tipo) {
      case 'consulta': return '#9c27b0';
      case 'exame': return '#2196f3';
      case 'terapia': return '#4caf50';
      default: return '#757575';
    }
  }

  get mediaDor(): number {
    if (this.historico.length === 0) return 0;
    const total = this.historico.reduce((acc, cur) => acc + cur.nivelDor, 0);
    return Math.round(total / this.historico.length);
  }

  get diasSeguidos(): number {
    return this.historico.length;
  }

  salvarRegistro() {
    const registroSalvo: RegistroDiario = {
      ...this.novoRegistro,
      data: new Date()
    };
    this.historico.unshift(registroSalvo);
    this.novoRegistro = {
      data: new Date(),
      nivelDor: 3,
      nivelFadiga: 3,
      humor: 'neutro',
      notas: ''
    };

    alert('Check-in diário salvo com sucesso!');
  }
  getCorDor(nivel: number): string {
    if (nivel <= 3) return '#4caf50';
    if (nivel <= 6) return '#ff9800';
    return '#f44336';
  }

  getIconeHumor(humor: string): string {
    const icones: any = {
      'feliz': 'sentiment_very_satisfied',
      'neutro': 'sentiment_neutral',
      'triste': 'sentiment_dissatisfied',
      'ansioso': 'sentiment_worried'
    };
    return icones[humor] || 'sentiment_neutral';
  }
}
