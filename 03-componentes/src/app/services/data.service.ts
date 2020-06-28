import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { delay} from 'rxjs/operators';
import { Componente, Menu } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url:string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http:HttpClient) { }

  getUsuario(){
    return this.http.get(this.url);
  }

  getMenu(){
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getAlbums(){
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  }

  getHeroes(){
    return this.http.get('/assets/data/superheroes.json').pipe(
      delay(1500)
    );
  }

}
