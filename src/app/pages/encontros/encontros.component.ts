import { Component } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encontros',
  imports: [MapaComponent, CommonModule],
  templateUrl: './encontros.component.html',
  styleUrl: './encontros.component.scss'
})
export class EncontrosComponent {
  encontros = [
    {
      data: 'Sáb, 15 Jun - 16:00',
      titulo: 'Roda de Conversa Online',
      local: 'Online',
      tipo: 'online', // usado para estilização se necessário
      imagemCor: '#E1BEE7' // Cor simulando a imagem do mockup
    },
    {
      data: 'Dom, 16 Jun - 09:00',
      titulo: 'Caminhada no Parque',
      local: 'Presencial - SP',
      tipo: 'presencial',
      imagemCor: '#E1BEE7'
    },
    {
      data: 'Qua, 20 Jun - 19:00',
      titulo: 'Workshop de Nutrição',
      local: 'Online',
      tipo: 'online',
      imagemCor: '#E1BEE7'
    }
  ];
}
