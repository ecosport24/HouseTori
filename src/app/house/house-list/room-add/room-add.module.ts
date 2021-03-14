import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RoomAddPageRoutingModule } from "./room-add-routing.module";

import { RoomAddPage } from "./room-add.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RoomAddPageRoutingModule,
  ],
  declarations: [RoomAddPage],
})
export class RoomAddPageModule {}
