import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, Pelicula, PeliculaDetalle, Credits, Genre } from '../interfaces/iterfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url
const API_KEY = environment.apiKey


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private populatesPage = 0;
  private generos: Genre[] = [];
  
  constructor(private http:HttpClient) { }
  
  private ejecutarQuery<T>(query:string){
    
    query = URL + query
    query += `&api_key=${API_KEY}&language=es&include_image_language=es`
    
    return this.http.get<T>(query)
  }

  getFeature(){
    let hoy = new Date()
    let ultimoDia = new Date(hoy.getFullYear(),hoy.getMonth()+1,0).getDate()
    let mes = hoy.getMonth() + 1

    let mesString;

    if(mes < 10){
      mesString = '0'+ mes;
    }else{
      mesString = mes;
    }

    let inicio = `${hoy.getFullYear()}-${mesString}-01`
    let final = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`
    return this.ejecutarQuery<RespuestaMDB>(`discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${final}`)
  }

  getPopulares(){
    this.populatesPage++;
    const query = `discover/movie?sort_by=popularity.desc&page=${this.populatesPage}`
    return this.ejecutarQuery<RespuestaMDB>(query)    
  }

  getDetalle(id:string){
    return this.ejecutarQuery<PeliculaDetalle>(`movie/${id}?a=1`)
  }
  

  getCreditos(id:string){
    return this.ejecutarQuery<Credits>(`movie/${id}/credits?a=1`)
  }

  buscarPelicula(query: string){
    return this.ejecutarQuery<RespuestaMDB>(`search/movie?query=${query}`)
  }

  cargarGeneros():Promise<Genre[]>{
    return new Promise(resolve=>{
      this.ejecutarQuery(`genre/movie/list?a=1`)
          .subscribe((resp:Genre[])=>{
            this.generos = resp['genres']
            resolve(this.generos)
          })
    })
  }

}
