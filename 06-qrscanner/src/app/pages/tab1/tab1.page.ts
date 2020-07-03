import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slidesOpt = {
    allowSlidePrev:false,
    allowSlideNext:false
  }
  constructor(private barCodeScanner:BarcodeScanner, private dataLocal:DataLocalService) {}

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  ionViewWillLeave(){
  }

  ionViewWillEnter(){
  }

  scan(){
    this.barCodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if( !barcodeData.cancelled ){
        this.dataLocal.guardaRegistro(barcodeData.format, barcodeData.text)
      }
     }).catch(err => {
         console.log('Error', err);
         this.dataLocal.guardaRegistro('QrCode', 'geo:-16.4962645,-68.1425983')
     });
  }

}
