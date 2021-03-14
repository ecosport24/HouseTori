import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { User } from "src/app/services/models/user-model";

@Component({
  selector: "app-admin-users-list",
  templateUrl: "./admin-users-list.page.html",
  styleUrls: ["./admin-users-list.page.scss"],
})
export class AdminUsersListPage implements OnInit {
  users: User[];
  todayUsers: User[];
  displayUsers: User[];
  no_users: boolean = false;
  constructor(
    private authService: AuthStorageService,
    private activatedRoute: ActivatedRoute
  ) {}
  is_today = false;
  selectDate: any = "";
  ngOnInit() {}

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe((param) => {
      let list_sort_to = param.get("usersList");
      this.is_today = list_sort_to == "today" ? true : false;
      this.authService.FetchAllAccounts().subscribe((data: any) => {
        this.users = data.data;
        this.users = this.users.filter(
          (users) => users.acc_email != "admin@housetori.com"
        );
        this.selectDate = this.is_today
          ? new Date().toISOString().slice(0, 10)
          : "";
        this.todayUsers = this.users.filter(
          (users) => users.acc_created_date == this.selectDate
        );
        this.displayUsers = this.is_today ? this.todayUsers : this.users;
        this.no_users = this.displayUsers.length > 0 ? true : false;
      });
    });
  }

  Logout() {
    this.authService.Logout();
  }

  FilteredUsersByDate() {
    this.selectDate = new Date(this.selectDate).toISOString().slice(0, 10);
    this.displayUsers = this.users.filter(
      (users) => users.acc_created_date <= this.selectDate
    );
    // console.log(this.displayUsers.length);
  }
}
