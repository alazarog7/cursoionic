import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula } from '../../interfaces/iterfaces';
import { DetalleComponent } from '../../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = ""
  estadoBusqueda = false

  peliculas: Pelicula[] = [] 

  constructor(private movieService: MoviesService, private modalCtrl:ModalController) {}

  buscar(e){
      this.peliculas = []
      this.estadoBusqueda = true
      this.movieService.buscarPelicula(e.detail.value).subscribe(data=>{
        console.log(data);
        this.peliculas = data.results
        this.estadoBusqueda = false
      },(err)=>{
        console.log('error');
        this.estadoBusqueda = false
      })
      
  }

  async verPelicula(id: string){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    })

    await modal.present()

    const {data }= await modal.onDidDismiss();
  }

}
