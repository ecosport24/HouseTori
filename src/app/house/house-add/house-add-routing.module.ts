import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseAddPage } from './house-add.page';

const routes: Routes = [
  {
    path: '',
    component: HouseAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseAddPageRoutingModule {}
