import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListPage } from './item-list.page';

const routes: Routes = [
  {
    path: '',
    component: ItemListPage
  },
  {
    path: 'item-info',
    loadChildren: () => import('./item-info/item-info.module').then( m => m.ItemInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemListPageRoutingModule {}
