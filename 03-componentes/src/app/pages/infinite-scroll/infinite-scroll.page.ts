import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.page.html',
  styleUrls: ['./infinite-scroll.page.scss'],
})
export class InfiniteScrollPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite:IonInfiniteScroll;
  titulo:string = "Infinite Scroll"
  lista:any[] = new Array(20)
  constructor() { }

  ngOnInit() {
  }

  loadData(e){
    console.log("cargando data");
    setTimeout(()=>{
      const nuevoArr = new Array(20)
      if (this.lista.length > 50) {
        e.target.complete();
        this.infinite.disabled = true;
        return;
      }
      this.lista.push(...nuevoArr)
      e.target.complete();
    },1000)
  }

}
