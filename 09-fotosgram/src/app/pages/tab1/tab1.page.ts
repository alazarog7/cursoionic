import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';
import { ChildActivationStart } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = [];

  @ViewChild(IonInfiniteScroll,{static:true}) infinite:IonInfiniteScroll;

  constructor(private postsService:PostsService) {}

  ngOnInit(){
   this.cargarPosts()
   this.postsService.nuevoPost.subscribe( resp => {
     this.posts.unshift( resp );
   })
  }

  recargar(event){
    this.posts = [];
    this.cargarPosts(event,true)
    this.infinite.disabled = false;
  }

  cargarPosts( event?, pull:boolean = false ){
    
    this.postsService.getPosts(pull).subscribe(data=>{
      
      if( data.posts.length === 0){
        this.infinite.disabled = true;
        return;
      }   

      this.posts.push(...data.posts);

      if(event){
        event.target.complete();
        return;
      }

    })
  }

}
