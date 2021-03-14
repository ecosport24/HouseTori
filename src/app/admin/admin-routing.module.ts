import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminPage } from "./admin.page";

const routes: Routes = [
  {
    path: "tabs",
    component: AdminPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./admin-home/admin-home.module").then(
            (m) => m.AdminHomePageModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("../profile/profile.module").then((m) => m.ProfilePageModule),
      },
      {
        path: "",
        redirectTo: "/admin/tabs/home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/admin/tabs/home",
    pathMatch: "full",
  },
  {
    path: 'admin-users-list',
    loadChildren: () => import('./admin-users-list/admin-users-list.module').then( m => m.AdminUsersListPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
