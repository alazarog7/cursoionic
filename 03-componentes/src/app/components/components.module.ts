import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PopinfoComponent } from './popinfo/popinfo.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PopinfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    PopinfoComponent
  ]
})
export class ComponentsModule { }
