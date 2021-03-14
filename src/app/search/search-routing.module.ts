import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: 'search-item',
    loadChildren: () => import('./search-item/search-item.module').then( m => m.SearchItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
