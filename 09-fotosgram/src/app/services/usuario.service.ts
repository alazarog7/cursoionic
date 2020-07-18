import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http:HttpClient, private storage:Storage, private navCtrl: NavController ) { }

  login(email: string, password:string){
    
    const data = { email , password }

    return new Promise((resolve) => {

      console.log(URL);
  
      return this.http.post(`${URL}user/login`,data).subscribe( async(resp) => {
        console.log(data)
        console.log(resp)
  
        if( resp['ok']){
          await this.guardarToken(resp['token']);
          resolve(true);
        } else{
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
  
      });

    })

  }

  registro(usuario:Usuario){
    return new Promise( resolve =>{
      this.http.post(`${URL}user/create`,usuario).subscribe( async resp =>{
        console.log(resp,resp['ok']);
        if( resp['ok'] === true ){
          console.log('okokok');
          await this.guardarToken(resp['token']);
          resolve(true);
        } else{
          console.log(resp)
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      })
    })
  }

  getUsuario(){

      if(!this.usuario._id){
        this.validaToken();
      }

      return {
        ...this.usuario
      }
  }

  async guardarToken( token: string){
      this.token = token;
      await this.storage.set('token',token)
      await this.validaToken();
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean>{

    await this.cargarToken();

    if(!this.token){
      
      this.navCtrl.navigateRoot('/login');

      return Promise.resolve(true);
    }

    const headers = new HttpHeaders({
      'x-token': this.token
    })

    console.log(headers)
    return new Promise<boolean>( resolve => {
      this.http.get(`${URL}user`,{headers}).subscribe( resp =>{
        if( resp['ok'] ){
          this.usuario = resp['usuario'];
          resolve(true);
        } else{
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      })
    } );
  }

  actualizarUsuario(usuario: Usuario)  {
    const headers = new HttpHeaders({
      'x-token':this.token
    })

    return new Promise( resolve  => {
      this.http.post(`${URL}user/update`, usuario, {headers})
          .subscribe( resp => {
            
            console.log(resp);

            if( resp['ok'] ){
              this.guardarToken( resp['token'] );
              resolve(true);
            } else {
              resolve(false);
            }
          })
    })
  }

  logout(){
    this.token = null ; 
    this.usuario = null;
    this.storage.clear;
    this.navCtrl.navigateRoot('/login',{animated : true})
  }
}
