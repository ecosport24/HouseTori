import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HouseAddPageRoutingModule } from "./house-add-routing.module";

import { HouseAddPage } from "./house-add.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HouseAddPageRoutingModule,
  ],
  declarations: [HouseAddPage],
})
export class HouseAddPageModule {}
