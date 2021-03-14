import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfileEditPageRoutingModule } from "./profile-edit-routing.module";

import { ProfileEditPage } from "./profile-edit.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ProfileEditPageRoutingModule,
  ],
  declarations: [ProfileEditPage],
})
export class ProfileEditPageModule {}
