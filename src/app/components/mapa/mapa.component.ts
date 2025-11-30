import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  imports: [GoogleMapsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {
  center: google.maps.LatLngLiteral = { lat: -23.550520, lng: -46.633309 };
  zoom = 15;

  // Configuração do Marcador (Pin)
  markerPosition: google.maps.LatLngLiteral = { lat: -23.550520, lng: -46.633309 };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    title: "Local do Encontro",
    animation: google.maps.Animation.DROP // Animação de "cair"
  };
}
