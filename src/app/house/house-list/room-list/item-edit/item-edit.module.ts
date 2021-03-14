import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemEditPageRoutingModule } from "./item-edit-routing.module";
import { IonicSelectableModule } from "ionic-selectable";

import { ItemEditPage } from "./item-edit.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ItemEditPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [ItemEditPage],
})
export class ItemEditPageModule {}
