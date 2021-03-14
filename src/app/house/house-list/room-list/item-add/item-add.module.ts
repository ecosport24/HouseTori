import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemAddPageRoutingModule } from "./item-add-routing.module";

import { ItemAddPage } from "./item-add.page";
import { IonicSelectableModule } from "ionic-selectable";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ItemAddPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [ItemAddPage],
})
export class ItemAddPageModule {}
