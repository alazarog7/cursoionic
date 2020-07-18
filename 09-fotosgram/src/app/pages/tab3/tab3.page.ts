import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UiServicesService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  usuario: Usuario = {};

  constructor(private service: UsuarioService, private ui:UiServicesService, private postService: PostsService) {}

  ngOnInit(): void {
    
    this.usuario = this.service.getUsuario();

  }

  async actualizar( fActualizar:NgForm){

    console.log(this.usuario);
    
    if( fActualizar.invalid ) { return; }
    
    const actualizado = await this.service.actualizarUsuario(this.usuario);
    
    if(actualizado){

     await this.ui.presentToast("Se actualizaron los datos");
     
    } else {

      await this.ui.presentToast("Erro en la actualizacion");

    }
    
  }
  
  logout(){

    this.postService.paginaPosts = 0;
    this.service.logout();
    
  }

}
