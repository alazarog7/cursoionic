import { Component, OnInit, Input, ViewChild } from '@angular/core';
declare var mapboxgl; 
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords;

  @ViewChild('mapa',{static: true}) mapa;
  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',')
    console.log(latLng)
    const lat = Number(latLng[0])
    const lng = Number(latLng[1])

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhemFyb2c3IiwiYSI6ImNrYzVqMTcxYjBpOXEycW1vbWc2cjZ2OGcifQ.XOQEBVHSPhgWv2Mr_ra2dA';
    var map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 15
    });

    const marker =  new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);

  }

}
