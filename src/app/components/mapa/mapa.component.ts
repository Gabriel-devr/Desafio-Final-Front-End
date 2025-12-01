import { Component, EventEmitter, Output } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  imports: [GoogleMapsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent {
  center: google.maps.LatLngLiteral = { lat: -12.974722, lng: -38.476665 };
  zoom = 15;

  markerPosition: google.maps.LatLngLiteral = { lat: -23.550520, lng: -46.633309 };
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    title: "Local do Encontro",
    animation: google.maps.Animation.DROP
  };

  @Output() mapaClick = new EventEmitter<google.maps.LatLngLiteral>();

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const coords = event.latLng.toJSON();
      this.mapaClick.emit(coords);
    }
  }
}
