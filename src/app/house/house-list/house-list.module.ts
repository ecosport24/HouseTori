import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HouseListPageRoutingModule } from './house-list-routing.module';

import { HouseListPage } from './house-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseListPageRoutingModule
  ],
  declarations: [HouseListPage]
})
export class HouseListPageModule {}
