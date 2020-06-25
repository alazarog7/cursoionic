import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { SiglepostComponent } from '../siglepost/siglepost.component';


@NgModule({
  declarations: [PostComponent,SiglepostComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
