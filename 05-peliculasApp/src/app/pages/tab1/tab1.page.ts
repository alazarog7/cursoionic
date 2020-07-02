import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, RespuestaMDB } from '../../interfaces/iterfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

 
  peliculasRecientes: Pelicula[] = []
  populares:Pelicula[] = []

  constructor(private movieService:MoviesService) {}
  
  ngOnInit(){
    this.movieService.getFeature().subscribe((data)=>{
      console.log(data);
      this.peliculasRecientes = data.results;
    })

    this.getPopulares()
    
  }

  agregarPeliculas(){
   
    this.getPopulares()
  }

  getPopulares(){
    this.movieService.getPopulares().subscribe(data=>{
      this.populares.push(...data.results)
    })
  }
}
