import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomEditPage } from './room-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RoomEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomEditPageRoutingModule {}
