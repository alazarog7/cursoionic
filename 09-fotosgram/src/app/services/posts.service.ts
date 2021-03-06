import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  nuevoPost = new EventEmitter<Post>()
  paginaPosts = 0;

  constructor(private http: HttpClient, private usuarioService:UsuarioService, private fileTransfer :FileTransfer) { }

  getPosts(pull){
    
    if(pull){
      this.paginaPosts = 0;  
    }
    
    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${URL}posts?pagina=${this.paginaPosts}`)

  }

  crearPost(post){

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve =>{

      this.http.post(`${URL}posts`, post, { headers }).subscribe( resp => {
        console.log(resp)
          this.nuevoPost.emit( resp['post'] );
          resolve(true);

      });

    } )
  }

  subirImagen(img: string){

    const options: FileUploadOptions = {
      fileKey : 'image', // es el nombre del campo en el servicio
      headers : {
        'x-token' : this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}posts/upload`, options)
                .then( data => {
                  console.log(data);
                } )
                .catch( err => {
                  console.log("Error", err);
                });


  }
}
