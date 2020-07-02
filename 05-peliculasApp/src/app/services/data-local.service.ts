import { Injectable } from '@angular/core';
import { Pelicula, PeliculaDetalle } from '../interfaces/iterfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { TabsPage } from '../pages/tabs/tabs.page';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  peliculaSubject = new Subject<any>();

  estadoFavorito: boolean = false

  constructor(private almacenamiento: Storage, private toastCtrl:ToastController) { 
   
    this.cargarPeliculas()
  }

  async cargarPeliculas(){
    await this.almacenamiento.get('favoritos').then((data: PeliculaDetalle[])=>{
      this.peliculas = data || []
    })

    return this.peliculas
  }

  buscarFavorito(id:number):boolean{
    return this.peliculas.filter(peli=>{
      return peli.id === id
    }).length > 0
    
  }
  
  enviarSubjectPelicula(pelicula:PeliculaDetalle){
    this.peliculaSubject.next(pelicula)
  }

  recibirSubjectPelicula():Observable<any>{
    return this.peliculaSubject.asObservable()
  }

  async guardarPelicula(pelicula:PeliculaDetalle){
      
      let peliculaRepetida = this.peliculas.filter(peli=>peli.id === pelicula.id)
      if(peliculaRepetida.length === 0){
        this.peliculas.push(pelicula);
        this.almacenamiento.set('favoritos',this.peliculas)
        const toast = await this.toastCtrl.create({
          header: 'Mensaje',
          message: 'Fue agregado a la lista de favoritos',
          position: 'bottom',
          buttons: [ {
              text: 'OK',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        toast.present();
      }else{

        this.peliculas = this.peliculas.filter(peli=>{
          return peli.id != pelicula.id
        });
        this.almacenamiento.set('favoritos',this.peliculas)
        const toast = await this.toastCtrl.create({
          header: 'Mensaje',
          message: 'Fue eliminado de la lista de favoritos',
          position: 'bottom',
          buttons: [ {
              text: 'OK',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        toast.present();
        this.enviarSubjectPelicula(pelicula)
      }

  }
}
