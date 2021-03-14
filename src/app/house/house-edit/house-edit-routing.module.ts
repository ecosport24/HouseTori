import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseEditPage } from './house-edit.page';

const routes: Routes = [
  {
    path: '',
    component: HouseEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseEditPageRoutingModule {}
