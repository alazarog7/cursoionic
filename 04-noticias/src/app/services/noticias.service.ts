import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Article, RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const url = environment.url;
const key = environment.apikey;

const headers = new HttpHeaders({
  'X-Api-key':key
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlines = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http:HttpClient) { }
  
  private ejecutarQuery<T>(query:string){
      //return this.http.get<T>(`${url}${query}`,{headers})

      return this.http.get<T>(`${url}${query}&apikey=35f165a64e47482ca5cdef49cac86555`)
  }

  getTopHeadLines(){
    this.headlines ++;
    console.log(this.headlines)
    return this.ejecutarQuery<RespuestaTopHeadLines>(`top-headlines?country=us&page=${this.headlines}`)
  }

  getByCategories(categoria:string){
    if(this.categoriaActual === categoria){ 
      this.categoriaPage++;
    }
    else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    console.log(this.categoriaPage);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`top-headlines?country=ar&category=${this.categoriaActual}&page=${this.categoriaPage}`)
  }

}

