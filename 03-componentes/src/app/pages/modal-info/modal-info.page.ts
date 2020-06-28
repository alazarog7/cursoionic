import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

  @Input() nombre;
  @Input() pais;
  titulo:string = "Informacion"
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  salirSinArgumentos(){
    this.modalCtrl.dismiss()
  }

  salirConArgumentos(){
    this.modalCtrl.dismiss({
      nombre: this.nombre,
      pais: this.pais
    })
  }

}
