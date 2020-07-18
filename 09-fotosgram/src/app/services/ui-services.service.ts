import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor(private alertCtrl:AlertController,private toastCtrl:ToastController) { }

  async presentAlert(mensaje) {
    const alert = await this.alertCtrl.create({
      message:mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(mensaje: string){

    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 2000
    });

    toast.present();

  }


}
