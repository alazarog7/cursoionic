import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Article;
  @Input() id:number;
  @Input() enFavoritos;
  
  constructor(private iab:InAppBrowser,private actionSheet:ActionSheetController, private socialSharing:SocialSharing, private dataLocalService:DataLocalService, private toastCtrl:ToastController) { }

  ngOnInit() {}

  abrirNoticia(){
      const browser = this.iab.create(this.noticia.url, '_system') // _system para abrir en el navegador nativo
  }
  async lanzarMenu(){
    let guardarBorrarBtn;
    console.log(this.enFavoritos)
    if(this.enFavoritos){
      guardarBorrarBtn = {
        text: 'Borrar de Favoritos',
        icon: 'trash-outline',
        cssClass:'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
          this.presentToast('Noticia borrada de Favoritos')
        }
      }
    }else{
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
         this.dataLocalService.guardarNoticia(this.noticia);
         this.presentToast('Noticia agregada a Favoritos')
        }
      }
    }

    
    const actionSheet = await this.actionSheet.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass:'action-dark',
        handler: () => {
          this.socialSharing.share(this.noticia.title, this.noticia.source.name,'',this.noticia.url )
          
        }
      }, guardarBorrarBtn, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass:'action-dark',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();

  }
  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message:mensaje,
      duration: 2000
    });
    toast.present();
  }

}
