import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @ViewChild('lista') lista:IonList;
  titulo:string = "Listas"
  usuarios:Observable<any>;
  constructor(private data:DataService, private toastController:ToastController) { }

  ngOnInit() {
    this.usuarios = this.data.getUsuario();

  }

  favorite(user){

    console.log('object', user);
    this.presentToast('favoritos')
    this.lista.closeSlidingItems()
  }
  unread(user){
    console.log('object', user);
    this.presentToast('no leidos')
    this.lista.closeSlidingItems()
  }
  share(user){
    console.log('object', user);
    this.presentToast('compartidos')
    this.lista.closeSlidingItems()
  }


  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message:mensaje,
      duration: 2000
    });
    toast.present();
  }

}
