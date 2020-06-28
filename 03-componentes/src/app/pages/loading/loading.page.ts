import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  titulo:string = "Loading"
  loading:any;
  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading("Espere un momento")
    setTimeout(()=>{
      this.loading.dismiss();
    },1500)
  }

  async presentLoading(mensaje:string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return  this.loading.present();
  }

}
