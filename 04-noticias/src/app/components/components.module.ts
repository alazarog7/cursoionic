import { NoticiasComponent } from './noticias/noticias.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';




@NgModule({
  declarations: [
    NoticiasComponent,
    NoticiaComponent
  ],
  exports:[
    NoticiasComponent
  ],
  
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
