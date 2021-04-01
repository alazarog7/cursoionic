import { Component, OnInit, ApplicationRef } from '@angular/core';
import { PushService } from '../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  mensajes:OSNotificationPayload[] = [];
  constructor(private pushService:PushService, private applicationRef:ApplicationRef) {}

  ngOnInit(){
    this.pushService.pushListener.subscribe(noti=>{
      this.mensajes.unshift(noti);
      this.applicationRef.tick();
    })
  }

  async ionViewWillEnter(){
    console.log("Cargando Mensajes");
    this.mensajes = await this.pushService.getMensajes()
  }

}