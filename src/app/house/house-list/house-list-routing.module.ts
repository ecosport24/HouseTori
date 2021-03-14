import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseListPage } from './house-list.page';

const routes: Routes = [
  {
    path: '',
    component: HouseListPage
  },
  {
    path: 'room-list',
    loadChildren: () => import('./room-list/room-list.module').then( m => m.RoomListPageModule)
  },
  {
    path: 'room-edit',
    loadChildren: () => import('./room-edit/room-edit.module').then( m => m.RoomEditPageModule)
  },
  {
    path: 'room-add',
    loadChildren: () => import('./room-add/room-add.module').then( m => m.RoomAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseListPageRoutingModule {}
