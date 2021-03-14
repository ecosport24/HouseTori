import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { AuthStorageService } from "../services/auth-storage.service";
import { ItemStorageService } from "../services/item-storage.service";
import { Item } from "../services/models/item.model";
import { RoomStorageService } from "../services/room-storage.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  items: Item[] = [];
  item: Item;
  userId: string;
  isCategory: boolean = false;
  itemCategories = [];
  imageDefault = "./assets/images/item.png";
  constructor(
    private rsService: RoomStorageService,
    private itmsService: ItemStorageService,
    private authService: AuthStorageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.itmsService.FetchingItemCategories().subscribe((data: any) => {
      this.itemCategories = data.data;
    });
    this.authService.GetLoginUser().subscribe((data: any) => {
      this.userId = data.acc_id;
      this.FetchingItems();
    });
  }

  FetchingItems() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itmsService
        .FetchingAllItemsUsingUserId(this.userId)
        .subscribe((data: any) => {
          this.items = data.data;
          console.log(data.data);
          loadingEl.dismiss();
        });
    });
  }

  onChanged(event: { component: IonicSelectableComponent; value: any }) {
    if (!event.value) {
      this.FetchingItems();
      return;
    }

    if (!this.isCategory) {
      this.items = [
        ...this.items.filter((item) => item.cat_id == event.value.cat_id),
      ];
    } else {
      this.items = [event.value];
    }
  }

  switchSearchField() {
    this.isCategory = !this.isCategory;
  }
}
