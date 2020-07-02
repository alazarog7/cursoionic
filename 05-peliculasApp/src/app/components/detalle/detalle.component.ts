import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, PeliculaDetalle, Actor } from '../../interfaces/iterfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  slidesOptActors={
    freeMode: true, 
    slidesPerView: 3,
    slidesPerColumn:1,
  }

  @Input() id:string;

 
  

  oculto: number = 150;

  pelicula: PeliculaDetalle;
  actores: Actor[]=[];
  favorito: boolean = false 
  constructor(private movieService:MoviesService, private modalCtrl:ModalController, private dataLocalService:DataLocalService) { }

  ngOnInit() {

    this.movieService.getDetalle(this.id).subscribe(data=>{
      this.pelicula = data
    })
    this.movieService.getCreditos(this.id).subscribe(data=>{
      this.actores = data.cast
    })
    this.favorito = this.dataLocalService.buscarFavorito(+this.id)

  }

  verTextoCompleto(texto: string){
    console.log(texto);
    this.oculto = texto.length;
  }

  regresar(){
    this.modalCtrl.dismiss()
  }
 
  agregarFavorito(pelicula: PeliculaDetalle){
    this.dataLocalService.guardarPelicula(pelicula);
    this.favorito = this.dataLocalService.buscarFavorito(+this.id)
  }
}
