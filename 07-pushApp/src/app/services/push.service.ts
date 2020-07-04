import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';
@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: OSNotificationPayload[] = []
  
  pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal:OneSignal, private storage:Storage) { 
    this.cargarMenssajes()
  }

  async getMensajes(){
    await this.cargarMenssajes()
    return [...this.mensajes];
  }

  configuracionInicial(){
    this.oneSignal.startInit('b9bd4de4-17c6-454b-ab9b-ce66143e5e62','516713751594');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
       this.notificacionRecibida(noti)
    });

    this.oneSignal.handleNotificationOpened().subscribe(async(noti) => {
      console.log('Notificacion abierta',noti);
      await this.notificacionRecibida(noti.notification);
    });

    this.oneSignal.endInit();
  }
  async notificacionRecibida(noti: OSNotification) {
    const payload = noti.payload;

    const existePush = this.mensajes.find( mensaje => mensaje.notificationID === payload.notificationID )

    if(existePush){
      return;
    }

    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);
    await this.guardarMensajes();
    
  }

  guardarMensajes(){
    this.storage.set('mensajes',this.mensajes)
  }

  async cargarMenssajes(){
    this.mensajes = await this.storage.get('mensajes') || [];
  }

}
