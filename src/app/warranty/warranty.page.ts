import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { AuthStorageService } from "../services/auth-storage.service";
import { ItemStorageService } from "../services/item-storage.service";
import { Item } from "../services/models/item.model";

@Component({
  selector: "app-warranty",
  templateUrl: "./warranty.page.html",
  styleUrls: ["./warranty.page.scss"],
})
export class WarrantyPage implements OnInit {
  items: Item[];
  userId: string;
  dateToday;
  listItems: Item[];
  segmentVal: string = "";
  isCategory: boolean = false;
  itemCategories = [];
  noItems: boolean = false;
  imageDefault: string = "assets/images/item.png";
  constructor(
    private authService: AuthStorageService,
    private itmsService: ItemStorageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.authService.GetLoginUser().subscribe((data: any) => {
        this.userId = data.acc_id;
        this.itmsService
          .FetchingAllItemsUsingUserId(this.userId)
          .subscribe((data: any) => {
            let items: Item[] = data.data;
            items = items.filter(
              (item) => item.itm_warranty_date != "0000-00-00"
            );
            this.items = items;
            this.dateToday = new Date().toISOString().slice(0, 10);
            this.segmentVal = "valid";
            loadingEl.dismiss();
          });
      });
    });

    this.itmsService.FetchingItemCategories().subscribe((data: any) => {
      this.itemCategories = data.data;
    });
  }

  availableItems() {
    let items: Item[] = this.items.filter(
      (item) => item.itm_warranty_date >= this.dateToday
    );
    return items;
  }

  expriredItems() {
    let items: Item[] = this.items.filter(
      (item) => item.itm_warranty_date <= this.dateToday
    );
    return items;
  }

  segmentChanged(ev: any) {
    this.segmentVal = ev.detail.value;
    if (ev.detail.value == "valid") {
      this.listItems = this.availableItems();
    } else {
      this.listItems = this.expriredItems();
    }
  }

  switchSearchField() {
    this.isCategory = !this.isCategory;
  }

  onChanged(event: { component: IonicSelectableComponent; value: any }) {
    if (!event.value) {
      if (this.segmentVal == "valid") {
        this.listItems = this.availableItems();
      } else {
        this.listItems = this.expriredItems();
      }
      this.noItems = false;
      return;
    }

    if (!this.isCategory) {
      this.listItems = [
        ...this.listItems.filter((item) => item.cat_id == event.value.cat_id),
      ];
    } else {
      this.listItems = [event.value];
    }

    this.noItems = this.listItems.length <= 0 ? true : false;
  }
}
