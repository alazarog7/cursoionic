import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidesLoginRegistro') slidesLoginRegistro: IonSlides

  

  loginUser = {
    email: 'mario@gmail.com',
    password: '123456'
  }


  registerUser: Usuario ={
    email:'test',
    password: '123456',
    nombre:'Test'
  } 
  constructor(private usuarioService: UsuarioService, private navCtrl:NavController, private uiService:UiServicesService) { }

  ngOnInit() { 
    if(this.usuarioService.token){
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated : true})
    }
  }

  ionViewWillEnter(){
    if(this.usuarioService.token){
      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated : true})
    }
  }

  ionViewDidEnter(){
    this.slidesLoginRegistro.lockSwipes(true)
  }

  async login(fLogin: NgForm){
    
    console.log(fLogin.valid)
    
    if( fLogin.invalid ) return;
    
    const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);

    console.log(valido)
    if( valido ){

      this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
      
    } else {
      
      this.uiService.presentAlert('Usuario y contraeña no son correctos');

    }

  }

  registro(fRegistro: NgForm){

    if(fRegistro.invalid){
      return;
    }

    this.usuarioService.registro(this.registerUser).then((data:boolean) =>{
      if( data){
    
        this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
        
      } else {
        
        this.uiService.presentAlert('No se pudo crear el usuario');
  
      }
    });

  }

  

  irSlide(slide:string){
    this.slidesLoginRegistro.lockSwipes(false)
    if( slide === 'ingresar'){
      this.slidesLoginRegistro.slideTo(0);
    }else{
      this.slidesLoginRegistro.slideTo(1);
    }
    this.slidesLoginRegistro.lockSwipes(true)

  }

}
