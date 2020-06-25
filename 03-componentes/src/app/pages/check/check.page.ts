import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage implements OnInit {

  titulo:string = "Check Box"
  datos = [
    {
      name:'primary',
      selected:false
    },
    {
      name:'secondary',
      selected:false
    },
    {
      name:'success',
      selected:true
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  onClick(data){
    console.log(data);
  }

}
