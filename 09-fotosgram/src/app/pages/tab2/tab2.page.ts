import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Route, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; 
declare var window;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo: boolean = false;

  post = {
    mensaje: '',
    coords: null,
    posicion:false
  }

  constructor(private postService: PostsService, private route:Router, private geolocation: Geolocation, private camera: Camera) {}

  async crearPost(){

    await this.postService.crearPost(this.post);
    
    this.post = {
      mensaje: '',
      coords: null,
      posicion:false
    }

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1')
    
  }

  getGeo() {

    if( !this.post.posicion ){
        this.post.coords = null;
        return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords  = `${resp.coords.latitude},${resp.coords.longitude}`
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    
  }

  habilitarCamaraGaleria(tipo:string){

    const source = tipo === 'CAMERA'? this.camera.PictureSourceType.CAMERA: this.camera.PictureSourceType.PHOTOLIBRARY; 

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: source
    }
    
    this.camera.getPicture(options).then( ( imageData ) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const img = window.Ionic.WebView.convertFileSrc( imageData );

     this.postService.subirImagen( imageData );

     this.tempImages.push(img);

    }, (err) => {
     // Handle error
    });

  }

  

}
