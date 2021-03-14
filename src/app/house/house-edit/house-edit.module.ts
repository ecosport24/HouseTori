import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HouseEditPageRoutingModule } from "./house-edit-routing.module";

import { HouseEditPage } from "./house-edit.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HouseEditPageRoutingModule,
  ],
  declarations: [HouseEditPage],
})
export class HouseEditPageModule {}
