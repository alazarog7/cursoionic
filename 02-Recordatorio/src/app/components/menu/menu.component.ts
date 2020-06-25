import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  rutas =[
    {
      name:'Home',
      route:'/home'
    },
    {
      name:'Contact',
      route:'/contact'
    },
    {
      name:'About',
      route:'/about'
    },
    {
      name:'Posts',
      route:'/posts'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
