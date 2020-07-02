import { Component, OnInit, Input, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/iterfaces';
import { EventEmitter } from '@angular/core';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  
  @Input() peliculasRecientes: Pelicula[];
  @Input() peliculasPorColumna;
  @Input() paginado:boolean;

  @Output() agregarPeliculas = new EventEmitter();
  
  slideOpts = {
    slidePerView : 3.1,
    freeMode: true, 
    slidesPerView: 3,
    slidesPerColumn:1,
  }

  

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
   this.slideOpts["slidesPerColumn"] = this.peliculasPorColumna
  }

  onClick(){
    this.agregarPeliculas.emit()
  }

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    })

    await modal.present()

    const {data }= await modal.onDidDismiss();
  }

}
