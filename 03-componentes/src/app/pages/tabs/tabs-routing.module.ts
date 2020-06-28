import { AvatarPage } from './../avatar/avatar.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { ListPage } from '../list/list.page';
import { InfiniteScrollPage } from '../infinite-scroll/infinite-scroll.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'contact'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {path:'account',component:AvatarPage},
      {path:'contact',component:ListPage},
      {path:'settings',component:InfiniteScrollPage}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
