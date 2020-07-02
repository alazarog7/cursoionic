import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre, Pelicula } from '../../interfaces/iterfaces';
import { DataLocalService } from '../../services/data-local.service';
import { MoviesService } from '../../services/movies.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = []
  peliculasGeneros: any[] = []

  pelicualEliminadaId;

  constructor(private dataLocal: DataLocalService, private moviesService: MoviesService) {
    this.dataLocal.recibirSubjectPelicula().subscribe((data:PeliculaDetalle)=>{
      this.pelicualEliminadaId=data.id
      this.actualizarLista();
    })
  }

  async ionViewWillEnter(){
      this.actualizarLista()
  }

  async actualizarLista(){
    this.peliculas =  await this.dataLocal.cargarPeliculas() 

      this.moviesService.cargarGeneros().then(data=>{
        
        data.forEach(genero=>{
          this.peliculasGeneros[genero.name] = []
        })
        this.peliculas.forEach(pelicula=>{
              if(!this.pelicualEliminadaId){
                pelicula.genres.forEach(genre=>{
                  this.peliculasGeneros[genre.name].push(pelicula)
                })
              }else{
                pelicula.genres.forEach(genre=>{
                  if(this.pelicualEliminadaId!==pelicula.id)
                      this.peliculasGeneros[genre.name].push(pelicula)
                })
              }
        })
      })
  }
}
