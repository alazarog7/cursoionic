import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  posteos = []

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      tap(console.log)
    );
  }


}
