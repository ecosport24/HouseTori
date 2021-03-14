import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomListPage } from './room-list.page';

const routes: Routes = [
  {
    path: '',
    component: RoomListPage
  },
  {
    path: 'item-list',
    loadChildren: () => import('./item-list/item-list.module').then( m => m.ItemListPageModule)
  },
  {
    path: 'item-edit',
    loadChildren: () => import('./item-edit/item-edit.module').then( m => m.ItemEditPageModule)
  },
  {
    path: 'item-add',
    loadChildren: () => import('./item-add/item-add.module').then( m => m.ItemAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomListPageRoutingModule {}
