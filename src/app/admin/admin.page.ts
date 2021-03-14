import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.menuCtrl.swipeGesture(false);
  }
}
