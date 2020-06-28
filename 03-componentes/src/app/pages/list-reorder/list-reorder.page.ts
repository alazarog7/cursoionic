import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage implements OnInit {

  titulo:string=""
  personajes = ["homero","march","bart","lisa"]
  constructor() { }

  ngOnInit() {
  }

  reorder(e){
    console.log(e)
    const itemMover = this.personajes.splice(e.detail.from,1)[0];
    this.personajes.splice(e.detail.to,0,itemMover);
    e.detail.complete();
  }
  ver(){
    console.log(this.personajes)
  }
}
