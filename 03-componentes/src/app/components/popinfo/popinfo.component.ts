import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

  items:any[] = new Array(20);
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  onClick(i:number){
    console.log("item",i);

    this.popoverCtrl.dismiss({
      item:i
    })

  }

}
