import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {


    @Output() avatarSeleccionado = new EventEmitter();
    @Input() imagen:string;

    avatars = [
      {
        img: 'assets/avatars/av-1.png',
        seleccionado: true
      },
      {
        img: 'assets/avatars/av-2.png',
        seleccionado: false
      },
      {
        img: 'assets/avatars/av-3.png',
        seleccionado: false
      },
      {
        img: 'assets/avatars/av-4.png',
        seleccionado: false
      },
      {
        img: 'assets/avatars/av-5.png',
        seleccionado: false
      },
      {
        img: 'assets/avatars/av-6.png',
        seleccionado: false
      },
      {
        img: 'assets/avatars/av-7.png',
        seleccionado: false
      },
      {
        img: 'assets/avatars/av-8.png',
        seleccionado: false
      },
  ];
  
  avatarSlide = {
    slidesPerView : 3.5
  }

  constructor() { }

  ngOnInit() {
    this.avatars.forEach(avatar =>{
      avatar.seleccionado = false;
      if( avatar.img === this.imagen ){
        avatar.seleccionado = true ;
      }
    })
  }

  seleccionadAvatar(avatar){
    this.avatars.forEach( avatar => avatar.seleccionado = false )
    avatar.seleccionado = true;
    this.avatarSeleccionado.emit(avatar.img)
  }
}
