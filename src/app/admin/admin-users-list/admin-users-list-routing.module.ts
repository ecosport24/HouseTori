import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersListPage } from './admin-users-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersListPageRoutingModule {}
