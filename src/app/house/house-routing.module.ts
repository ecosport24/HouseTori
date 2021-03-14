import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HousePage } from "./house.page";

const routes: Routes = [
  {
    path: "tabs",
    component: HousePage,
    children: [
      {
        path: "house",
        loadChildren: () =>
          import("./house-list/house-list.module").then(
            (m) => m.HouseListPageModule
          ),
      },
      {
        path: "warranty",
        loadChildren: () =>
          import("../warranty/warranty.module").then(
            (m) => m.WarrantyPageModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../profile/profile.module").then((m) => m.ProfilePageModule),
      },
      {
        path: "",
        redirectTo: "/house/tabs/house",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/house/tabs/house",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HousePageRoutingModule {}
