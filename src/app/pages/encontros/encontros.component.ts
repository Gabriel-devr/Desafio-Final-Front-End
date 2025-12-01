import { Component } from '@angular/core';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encontros',
  imports: [MapaComponent, CommonModule, FormsModule],
  templateUrl: './encontros.component.html',
  styleUrl: './encontros.component.scss'
})
export class EncontrosComponent {
  novoTitulo: string = '';
  novaDescricao: string = '';
  apiKey = 'AIzaSyDOuoIjHMGTJO4rOfEedXxd-t5yYTW9uro'

  gerarUrlMapa(lat: number, lng: number): string {
    const apiKey = 'AIzaSyDOuoIjHMGTJO4rOfEedXxd-t5yYTW9uro';
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${apiKey}`;
  }

  encontros = [
    {
      data: 'Sáb, 15 Jun - 16:00',
      titulo: 'Roda de Conversa Online',
      descricao: 'Um espaço seguro para compartilhar experiências.',
      local: 'Online',
      tipo: 'online',
      imagem: '',
      cor: '#E1BEE7'
    },
    {
      data: 'Dom, 16 Jun - 09:00',
      titulo: 'Caminhada no Parque',
      descricao: 'Exercício leve ao ar livre.',
      local: 'Parque Ibirapuera - Av. Pedro Álvares Cabral - SP',
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(-23.587416, -46.657634),
      cor: '#B2DFDB'
    }
  ];

  adicionarNovoEncontro(coords: google.maps.LatLngLiteral) {
    if (!this.novoTitulo || !this.novaDescricao) {
      alert('Por favor, preencha o Título e a Descrição antes de escolher o local no mapa.');
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
    const novoEncontro = {
      data: 'Data a definir',
      titulo: this.novoTitulo,
      descricao: this.novaDescricao,
      local: endereco,
      tipo: 'presencial',
      imagem: this.gerarUrlMapa(coords.lat, coords.lng),
      cor: '#CFD8DC'
    };

    this.encontros.unshift(novoEncontro);

    this.novoTitulo = '';
    this.novaDescricao = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
