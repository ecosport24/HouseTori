import { Injectable } from "@angular/core";
import { BehaviorSubject, from } from "rxjs";
import { filter, map, take, tap } from "rxjs/operators";
import { DataStorageService } from "./data-storage.service";
import { User } from "./models/user-model";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { filterInput } from "./models/data-schema.model";

@Injectable({
  providedIn: "root",
})
export class AuthStorageService {
  private user = new BehaviorSubject<User>(null);

  constructor(
    private dsService: DataStorageService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storage: Storage
  ) {}

  get isAuthenticated() {
    return this.user.asObservable().pipe(
      take(1),
      map((user) => {
        if (user) {
          return !!user.acc_email;
        }
        return false;
      })
    );
  }

  FetchAllAccounts() {
    return this.dsService.Data_Server("select_all_accounts", 1);
  }

  GetLoginUser() {
    return this.user.asObservable().pipe(take(1));
  }

  // GetUserUsingUserID(acc_id: string) {
  //   let fileterdata = new filterInput();
  //   fileterdata.filter = acc_id;
  //   return this.dsService.Data_Server("select_login_user", fileterdata);
  // }

  UpdateUser(
    acc_first_name: string,
    acc_last_name: string,
    acc_email: string,
    acc_img: string,
    acc_id: string
  ) {
    let user: User = {
      acc_first_name,
      acc_last_name,
      acc_email,
      acc_img,
      acc_id,
    };

    return this.dsService.Data_Server("user_update_info", user).pipe(
      tap((data: any) => {
        this.user.next(null);
        this.storage.remove("userData");
        this.UpdateAllProfileInfo(acc_id);
      })
    );
  }

  UpdateAllProfileInfo(acc_id) {
    let filterdata = new filterInput();
    filterdata.filter = acc_id;
    this.dsService
      .Data_Server("select_login_user", filterdata)
      .subscribe((data: any) => {
        this.user.next(data.data[0]);
        this.storage.set("userData", data.data[0]);
      });
  }

  Login(credentials: any) {
    // console.log();
    return this.dsService.Data_Server("user_authentication", credentials).pipe(
      tap((data: any) => {
        if (data.code == "200") {
          this.user.next(data.data[0]);
          this.storage.set("userData", data.data[0]);
        }
      })
    );
  }

  AoutoLogin() {
    return from(this.storage.get("userData")).pipe(
      tap((userInfo) => {
        this.user.next(userInfo);
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  Logout() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.user.next(null);
      this.storage.remove("userData").then(() => {
        this.router.navigateByUrl("/auth");
        loadingEl.dismiss();
      });
    });
  }

  AddUser(credentials: any) {
    return this.dsService.Data_Server("register_new_user", credentials);
  }
}
