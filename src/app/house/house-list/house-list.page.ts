import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { HouseStorageService } from "src/app/services/house-storage.service";
import { Home } from "src/app/services/models/house.model";

@Component({
  selector: "app-house-list",
  templateUrl: "./house-list.page.html",
  styleUrls: ["./house-list.page.scss"],
})
export class HouseListPage implements OnInit {
  houses: Home[] = [];
  imageURL: string = "assets/images/home.png";
  noItems: boolean = false;
  addImg = "assets/images/add home.png";
  constructor(
    private authService: AuthStorageService,
    private hsService: HouseStorageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.houseListData();
  }
  houseListData(event?: any) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.authService.GetLoginUser().subscribe((data: any) => {
        this.hsService
          .FetchHousesUsingUserId(data.acc_id)
          .subscribe((data: any) => {
            this.houses = data.data;
            this.noItems = this.houses.length == 0 ? true : false;
            if (event) {
              event.target.complete();
            }
            loadingEl.dismiss();
          });
      });
    });
  }

  doRefresh(event) {
    this.houseListData(event);
  }
}
