import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUsersListPageRoutingModule } from './admin-users-list-routing.module';

import { AdminUsersListPage } from './admin-users-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUsersListPageRoutingModule
  ],
  declarations: [AdminUsersListPage]
})
export class AdminUsersListPageModule {}
