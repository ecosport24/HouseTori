import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomEditPageRoutingModule } from './room-edit-routing.module';

import { RoomEditPage } from './room-edit.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RoomEditPageRoutingModule
  ],
  declarations: [RoomEditPage]
})
export class RoomEditPageModule {}
