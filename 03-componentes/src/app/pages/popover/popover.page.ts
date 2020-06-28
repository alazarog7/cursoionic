import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  titulo:string = "Pop Over"
  constructor(private popOverCtrl:PopoverController) { }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popOverCtrl.create({
      component: PopinfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      mode:'ios',
      backdropDismiss: false
    });
    await popover.present();

    //const {data} = await popover.onDidDismiss();
    const {data} = await popover.onWillDismiss();

    console.log(data)
  }
}
