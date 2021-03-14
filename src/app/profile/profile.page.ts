import { Component, OnInit } from "@angular/core";
import { AuthStorageService } from "../services/auth-storage.service";
import { User } from "../services/models/user-model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  imageURL = "assets/images/me.png";
  user: User;
  is_edit = false;
  is_admin = false;

  userImage = "";
  constructor(private authService: AuthStorageService) {}

  ngOnInit() {
    this.authService.GetLoginUser().subscribe((data) => {
      this.user = data;
      this.is_admin =
        this.user.acc_email == "admin@housetori.com" ? true : false;
      this.userImage = this.user.acc_img;
      console.log(this.user);
    });
  }

  switchEditToUpdate() {
    this.is_edit = !this.is_edit;
  }
}
