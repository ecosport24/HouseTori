import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { ItemStorageService } from "src/app/services/item-storage.service";
import { Item } from "src/app/services/models/item.model";

@Component({
  selector: "app-search-item",
  templateUrl: "./search-item.page.html",
  styleUrls: ["./search-item.page.scss"],
})
export class SearchItemPage implements OnInit {
  item: Item;
  itemId: string;
  warrantyItemId: string;
  imageDefault: string = "assets/images/item.png";
  itemInfos: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private itemSerivice: ItemStorageService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.itemId = param.get("searchItemId");
      this.warrantyItemId = param.get("warrantyItemId");
      this.itemId = this.itemId ? this.itemId : this.warrantyItemId;
      this.itemSerivice.GetItem(this.itemId).subscribe((data: any) => {
        this.item = data;
        this.itemInfos = data;
      });
    });
  }

  onLocation() {
    this.alertCtrl
      .create({
        header: "Item Location",
        message:
          "This is the information about the location of :<b>" +
          this.item.itm_name +
          "</b>  <br>House: <b>" +
          this.itemInfos.hs_name +
          "</b> <br>Room: <b>" +
          this.itemInfos.rm_name +
          "</b>.",
        buttons: [
          {
            text: "Dismiss",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
}
