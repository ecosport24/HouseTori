import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then((m) => m.AuthPageModule),
  },
  {
    path: "intro",
    loadChildren: () =>
      import("./intro/intro.module").then((m) => m.IntroPageModule),
  },

  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminPageModule),
    canLoad: [AuthGuard],
  },

  {
    path: "profile",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfilePageModule),
      },
      {
        path: "profile-edit",
        loadChildren: () =>
          import("./profile/profile-edit/profile-edit.module").then(
            (m) => m.ProfileEditPageModule
          ),
      },
      {
        path: "",
        redirectTo: "house",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "search",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./search/search.module").then((m) => m.SearchPageModule),
      },
      {
        path: ":searchItemId",
        loadChildren: () =>
          import("./search/search-item/search-item.module").then(
            (m) => m.SearchItemPageModule
          ),
      },
      {
        path: "",
        redirectTo: "house",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "warranty",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./warranty/warranty.module").then(
            (m) => m.WarrantyPageModule
          ),
      },
      {
        path: ":warrantyItemId",
        loadChildren: () =>
          import("./search/search-item/search-item.module").then(
            (m) => m.SearchItemPageModule
          ),
      },
      {
        path: "",
        redirectTo: "house",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "house",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./house/house.module").then((m) => m.HousePageModule),
        canLoad: [AuthGuard],
      },
      {
        path: "add",
        loadChildren: () =>
          import("./house/house-add/house-add.module").then(
            (m) => m.HouseAddPageModule
          ),
      },
      {
        path: ":houseId",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("./house/house-list/room-list/room-list.module").then(
                (m) => m.RoomListPageModule
              ),
          },
          {
            path: "edit",
            loadChildren: () =>
              import("./house/house-edit/house-edit.module").then(
                (m) => m.HouseEditPageModule
              ),
          },
          {
            path: "add",
            loadChildren: () =>
              import("./house/house-list/room-add/room-add.module").then(
                (m) => m.RoomAddPageModule
              ),
          },
          {
            path: ":roomId",
            children: [
              {
                path: "",
                loadChildren: () =>
                  import(
                    "./house/house-list/room-list/item-list/item-list.module"
                  ).then((m) => m.ItemListPageModule),
              },
              {
                path: "edit",
                loadChildren: () =>
                  import("./house/house-list/room-edit/room-edit.module").then(
                    (m) => m.RoomEditPageModule
                  ),
              },
              {
                path: "add",
                loadChildren: () =>
                  import(
                    "./house/house-list/room-list/item-add/item-add.module"
                  ).then((m) => m.ItemAddPageModule),
              },
              {
                path: ":itemId",
                children: [
                  {
                    path: "",
                    loadChildren: () =>
                      import(
                        "./house/house-list/room-list/item-list/item-info/item-info.module"
                      ).then((m) => m.ItemInfoPageModule),
                  },
                  {
                    path: "edit",
                    loadChildren: () =>
                      import(
                        "./house/house-list/room-list/item-edit/item-edit.module"
                      ).then((m) => m.ItemEditPageModule),
                  },
                  {
                    path: "",
                    redirectTo: "house",
                    pathMatch: "full",
                  },
                ],
              },
              {
                path: "",
                redirectTo: "house",
                pathMatch: "full",
              },
            ],
          },
          {
            path: "",
            redirectTo: "house",
            pathMatch: "full",
          },
        ],
      },
      {
        path: "",
        redirectTo: "house",
        pathMatch: "full",
      },
    ],
    canLoad: [AuthGuard],
  },
  {
    path: ":usersList",
    loadChildren: () =>
      import("./admin/admin-users-list/admin-users-list.module").then(
        (m) => m.AdminUsersListPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "house",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
