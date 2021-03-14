import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { User } from "src/app/services/models/user-model";

@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.page.html",
  styleUrls: ["./admin-home.page.scss"],
})
export class AdminHomePage implements OnInit {
  todays_count = 0;
  all_users_count = 0;
  constructor(
    private authService: AuthStorageService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.authService.FetchAllAccounts().subscribe((data: any) => {
      let dateToday = new Date().toISOString().slice(0, 10);
      let users: User[] = data.data;
      users = users.filter((users) => users.acc_email != "admin@housetori.com");
      this.todays_count = users.filter(
        (users) => users.acc_created_date == dateToday
      ).length;
      this.all_users_count = users.length;
      // console.log(users);
    });
  }

  Logout() {
    this.authService.Logout();
  }
}
