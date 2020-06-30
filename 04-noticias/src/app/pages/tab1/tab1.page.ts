import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild(IonInfiniteScroll,{static:true}) infinite:IonInfiniteScroll;
  noticias:Article[] = [];

  constructor(private noticiasServices:NoticiasService) {}

  ngOnInit(){
   this.cargarNoticias()
  }

  loadData(event){
   this.cargarNoticias(event)
  }

  cargarNoticias(event?){
    this.noticiasServices.getTopHeadLines().subscribe(data=>{
      console.log(data)
      this.noticias.push(...data.articles);
      if (this.noticias.length === data.totalResults ) {
        this.infinite.disabled = true;
        return;
      }

      if(event){
        event.target.complete();
        return;
      }

    })
  }
}
