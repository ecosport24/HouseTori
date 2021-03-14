import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomAddPage } from './room-add.page';

const routes: Routes = [
  {
    path: '',
    component: RoomAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomAddPageRoutingModule {}
