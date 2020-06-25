import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [
    {
      icon:'american-football',
      name:'Action Sheet',
      redirectTo:'/action-sheet'
    },
    {
      icon:'logo-google-playstore',
      name:'Alert',
      redirectTo:'/alert'
    },
    {
      icon:'beaker',
      name:'Avatar',
      redirectTo:'/avatar'
    },
    {
      icon:'radio-button-on',
      name:'Botones',
      redirectTo:'/botones'
    },
    {
      icon:'card',
      name:'Cards',
      redirectTo:'/card'
    },
    {
      icon:'checkmark-circle-outline',
      name:'CheckBox',
      redirectTo:'/check'
    },
    {
      icon:'calendar',
      name:'Calendar',
      redirectTo:'/date-time'
    },
    {
      icon:'car',
      name:'Fabs',
      redirectTo:'/fab'
    },
    {
      icon:'grid',
      name:'Grids',
      redirectTo:'/grid'
    }
  ] ;
  constructor() { }

  ngOnInit() {
  }

}
interface Componente{
  icon: string;
  name: string;
  redirectTo: string;
}
