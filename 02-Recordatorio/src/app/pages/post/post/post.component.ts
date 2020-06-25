import { Component, OnInit, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  datos:any = []
  constructor(private data:DataService) { }

  ngOnInit() {
    this.datos = this.data.getData();
  }

  escucharClick(id){
    console.log('Click en '+ id)
  }

}
