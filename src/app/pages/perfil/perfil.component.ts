import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroDiario } from '../../models/registro-diario';
import { Agendamento } from '../../models/agendamento';
import { DataService, AgendamentoComId, RegistroComId } from '../../services/data.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  private dataService = inject(DataService);

  @ViewChild('carousel') carousel!: ElementRef;

  usuario = {
    nome: 'Rondineli Andrade',
    email: 'rondineli@email.com'
  };

  novoRegistro: RegistroDiario = {
    data: new Date(),
    nivelDor: 3,
    nivelFadiga: 4,
    humor: 'neutro',
    notas: ''
  };

  exibirFormAgendamento = false;
  novoAgendamento: Agendamento = { titulo: '', data: '', horario: '', local: '', tipo: 'consulta' };

  get listaAgendamentos(): AgendamentoComId[] {
    return this.dataService.agendamentos();
  }

  get historico(): RegistroComId[] {
    return this.dataService.historicoDiario();
  }

  alternarFormAgendamento() {
    this.exibirFormAgendamento = !this.exibirFormAgendamento;
  }

  salvarAgendamento() {
    if (!this.novoAgendamento.titulo || !this.novoAgendamento.data) {
      alert('Preencha título e data.');
      return;
    }
    this.dataService.adicionarAgendamento({ ...this.novoAgendamento });
    this.novoAgendamento = { titulo: '', data: '', horario: '', local: '', tipo: 'consulta' };
    this.exibirFormAgendamento = false;
  }

  deletarAgendamento(id: number) {
    if (confirm('Cancelar este agendamento?')) this.dataService.removerAgendamento(id);
  }

  salvarRegistro() {
    const registro = { ...this.novoRegistro, data: new Date() };
    this.dataService.adicionarRegistro(registro);
    this.novoRegistro = { data: new Date(), nivelDor: 3, nivelFadiga: 3, humor: 'neutro', notas: '' };
    alert('Check-in salvo!');
  }

  deletarHistorico(id: number) {
    if (confirm('Apagar registro?')) this.dataService.removerHistorico(id);
  }

  // --- Helpers ---
  get mediaDor(): number {
    if (this.historico.length === 0) return 0;
    const total = this.historico.reduce((acc, cur) => acc + cur.nivelDor, 0);
    return Math.round(total / this.historico.length);
  }

  get diasSeguidos(): number { return this.historico.length; }

  getCorAgendamento(tipo: string): string {
    const cores: any = { 'consulta': '#9c27b0', 'exame': '#2196f3', 'terapia': '#4caf50' };
    return cores[tipo] || '#757575';
  }

  getCorDor(nivel: number): string {
    if (nivel <= 3) return '#4caf50';
    if (nivel <= 6) return '#ff9800';
    return '#f44336';
  }

  getIconeHumor(humor: string): string {
    const icones: any = { 'feliz': 'sentiment_very_satisfied', 'neutro': 'sentiment_neutral', 'triste': 'sentiment_dissatisfied', 'ansioso': 'sentiment_worried' };
    return icones[humor] || 'sentiment_neutral';
  }
}