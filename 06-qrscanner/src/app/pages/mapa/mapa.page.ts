import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var mapboxgl:any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  lat:number;
  long:number;
  constructor(private activatedRoute:ActivatedRoute) { }
  
  ngOnInit() {
    let geo= this.activatedRoute.snapshot.paramMap.get('geo').substring(4).split(',');
    this.lat = Number(geo[0]);
    this.long = Number(geo[1]);
    
    console.log(this.lat,this.long)
  }

  ngAfterViewInit(){
      mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhemFyb2c3IiwiYSI6ImNrYzVqMTcxYjBpOXEycW1vbWc2cjZ2OGcifQ.XOQEBVHSPhgWv2Mr_ra2dA';
      
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/light-v10',
        center: [this.long,this.lat],
        zoom: 17,
        pitch: 45,
        bearing: -17.6,
        container: 'mapa',
        antialias: true
        });
      
        map.on('load', () =>{
          map.resize();
          
          
          var marker = new mapboxgl.Marker()
                                  .setLngLat([this.long, this.lat])
                                  .addTo(map);


          const layers = map.getStyle().layers;
           
          let labelLayerId;
          for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
              labelLayerId = layers[i].id;
              break;
            }
          }
           
          map.addLayer(
            {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
            'fill-extrusion-color': '#aaa',
             
            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
            ],
            'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
            }
            },
            labelLayerId
            );
          });
  }
  

  

}
