import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment,{static:true}) ionSegment:IonSegment;
  @ViewChild(IonInfiniteScroll,{static:false}) infinite:IonInfiniteScroll;

  noticias:Article[]=[]
  categorias = ['entertainment','general','health','science','sports','technology']
  
  constructor(private noticiasService:NoticiasService) {}

  ngOnInit(){
    this.ionSegment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0])
  }

  cargarNoticias(categoria:string,event?){
    this.noticiasService.getByCategories(categoria).subscribe(data=>{
      console.log(data)
      this.noticias.push(...data.articles);
      if (data.articles.length == 0 ) {
        this.infinite.disabled = true;
        return;
      }
      if(event){
        event.target.complete();
        return;
      }
    })
  }
  cambioCategoria(e){
    this.noticias = []
    console.log(e.detail.value);
    this.cargarNoticias(e.detail.value)
  }
  
  loadData(event){
    console.log(this.ionSegment.value,event)
    this.cargarNoticias(this.ionSegment.value,event)
  }


}
