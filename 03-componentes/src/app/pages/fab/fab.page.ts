import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.page.html',
  styleUrls: ['./fab.page.scss'],
})
export class FabPage implements OnInit {

  titulo:string = "Fabs"
  data:number []=  [1,1,1,1,1]
  constructor() { }

  ngOnInit() {
  }

}
