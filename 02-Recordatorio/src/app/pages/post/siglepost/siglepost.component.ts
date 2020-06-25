import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-siglepost',
  templateUrl: './siglepost.component.html',
  styleUrls: ['./siglepost.component.css']
})
export class SiglepostComponent implements OnInit {

  @Input() dato;

  @Output() clickPost = new  EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.clickPost.emit(this.dato.id)
  }

}
