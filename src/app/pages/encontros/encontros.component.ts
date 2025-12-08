import { Component } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Encontro {
  id: number;
  data: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: string;
  imagem: string;
  cor: string;
  isUserCreated?: boolean;
}

@Component({
  selector: 'app-encontros',
  imports: [MapaComponent, CommonModule, FormsModule],
  templateUrl: './encontros.component.html',
  styleUrl: './encontros.component.scss'
})
export class EncontrosComponent {
  novoTitulo: string = '';
  novaDescricao: string = '';
  novaData: string = '';
  apiKey = 'AIzaSyDOuoIjHMGTJO4rOfEedXxd-t5yYTW9uro';

  gerarUrlMapa(lat: number, lng: number): string {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${this.apiKey}`;
  }

  encontros: Encontro[] = [
    {
      id: 1,
      data: 'Sáb, 15 Jun - 16:00',
      titulo: 'Roda de Conversa Online',
      descricao: 'Um espaço seguro para compartilhar experiências.',
      local: 'Online',
      tipo: 'online',
      imagem: '',
      cor: '#E1BEE7',
      isUserCreated: false
    },
    {
      id: 2,
      data: 'Dom, 16 Jun - 09:00',
      titulo: 'Caminhada no Parque da Cidade',
      descricao: 'Exercício leve ao ar livre no Itaigara.',
      local: 'Parque da Cidade - Av. Antônio Carlos Magalhães, Salvador - BA',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-13.0016, -38.4687),
      cor: '#B2DFDB',
      isUserCreated: false
    },
    {
      id: 3,
      data: 'Seg, 17 Jun - 19:00',
      titulo: 'Meditação Guiada',
      descricao: 'Sessão de mindfulness para relaxamento profundo.',
      local: 'Online',
      tipo: 'online',
      imagem: '',
      cor: '#FFF9C4',
      isUserCreated: false
    },
    {
      id: 4,
      data: 'Qua, 19 Jun - 14:00',
      titulo: 'Workshop de Nutrição',
      descricao: 'Dicas de alimentação anti-inflamatória no Pelourinho.',
      local: 'Centro Cultural Solar Ferrão - Pelourinho, Salvador - BA',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-12.9714, -38.5111),
      cor: '#FFCCBC',
      isUserCreated: false
    },
    {
      id: 5,
      data: 'Sex, 21 Jun - 10:00',
      titulo: 'Yoga Suave',
      descricao: 'Prática adaptada para alívio de dores.',
      local: 'Online',
      tipo: 'online',
      imagem: '',
      cor: '#C5CAE9',
      isUserCreated: false
    },
    {
      id: 6,
      data: 'Sáb, 22 Jun - 15:00',
      titulo: 'Grupo de Apoio Mútuo',
      descricao: 'Troca de vivências e suporte emocional.',
      local: 'Edifício Suarez Trade - Av. Tancredo Neves, Salvador - BA',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-12.9830, -38.4570),
      cor: '#F0F4C3',
      isUserCreated: false
    },
    {
      id: 7,
      data: 'Dom, 23 Jun - 11:00',
      titulo: 'Piquenique no Jardim Botânico',
      descricao: 'Encontro informal em contato com a natureza.',
      local: 'Jardim Botânico de Salvador - Av. São Rafael, Salvador - BA',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-12.9360, -38.4340),
      cor: '#D1C4E9',
      isUserCreated: false
    },
    {
      id: 8,
      data: 'Seg, 24 Jun - 18:30',
      titulo: 'Yoga Restaurativa',
      descricao: 'Técnicas de relaxamento profundo e alongamento passivo para alívio de tensões.',
      local: 'Online',
      tipo: 'online',
      imagem: '',
      cor: '#B3E5FC',
      isUserCreated: false
    },
    {
      id: 9,
      data: 'Qua, 26 Jun - 15:00',
      titulo: 'Palestra: Direitos do Paciente',
      descricao: 'Conheça seus direitos no tratamento de doenças crônicas.',
      local: 'Auditório da OAB - Rua Portão da Piedade, Salvador - BA',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-12.9815, -38.5120),
      cor: '#FFECB3',
      isUserCreated: false
    },
    {
      id: 10,
      data: 'Sex, 28 Jun - 16:00',
      titulo: 'Terapia do Riso',
      descricao: 'Encontro descontraído para melhorar o humor e reduzir o estresse.',
      local: 'Parque de Pituaçu - Av. Netuno, Salvador - BA',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-12.9550, -38.4150),
      cor: '#F8BBD0',
      isUserCreated: false
    }
  ];

  adicionarNovoEncontro(coords: google.maps.LatLngLiteral) {
    if (!this.novoTitulo || !this.novaDescricao || !this.novaData) {
      return;
    }

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: coords }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const enderecoFormatado = results[0].formatted_address;
        this.criarCard(coords, enderecoFormatado);
      } else {
        console.error('Geocoding falhou: ' + status);
        this.criarCard(coords, `Local (Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)})`);
      }
    });
  }

  criarCard(coords: google.maps.LatLngLiteral, endereco: string) {
    const dataObj = new Date(this.novaData);
    const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
      weekday: 'short', day: 'numeric', month: 'short'
    }) + ' - A definir';

    const novoId = this.encontros.length > 0 ? Math.max(...this.encontros.map(e => e.id)) + 1 : 1;

    const novoEncontro: Encontro = {
      id: novoId,
      data: dataFormatada,
      titulo: this.novoTitulo,
      descricao: this.novaDescricao,
      local: endereco,
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(coords.lat, coords.lng),
      cor: '#CFD8DC',
      isUserCreated: true
    };

    this.encontros.unshift(novoEncontro);

    this.novoTitulo = '';
    this.novaDescricao = '';
    this.novaData = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluirEncontro(index: number) {
    this.encontros.splice(index, 1);
  }
}