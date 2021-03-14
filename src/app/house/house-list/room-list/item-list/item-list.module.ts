import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ItemListPageRoutingModule } from "./item-list-routing.module";

import { ItemListPage } from "./item-list.page";
import { IonicSelectableModule } from "ionic-selectable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemListPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [ItemListPage],
})
export class ItemListPageModule {}
