import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { HouseStorageService } from "src/app/services/house-storage.service";
import { ItemStorageService } from "src/app/services/item-storage.service";
import { Home } from "src/app/services/models/house.model";
import { Item } from "src/app/services/models/item.model";
import { Room } from "src/app/services/models/room.model";
import { RoomStorageService } from "src/app/services/room-storage.service";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.page.html",
  styleUrls: ["./item-list.page.scss"],
})
export class ItemListPage implements OnInit {
  houseId: string;
  roomId: string;
  items: Item[];
  item: Item;
  noItems: boolean = false;
  totalValue: number = 0;
  houses: Home[];
  rooms: Room[];
  house: Home;
  room: Room;
  rmaddImgDefault: string = "assets/images/rmadd.png";
  itemImgDefault: string = "assets/images/item.png";
  itemCategories = [];
  searchItems: boolean = false;
  isCategory: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rsService: RoomStorageService,
    private itmsService: ItemStorageService,
    private authService: AuthStorageService,
    private hsService: HouseStorageService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.RunStart();
    this.itmsService.FetchingItemCategories().subscribe((data: any) => {
      this.itemCategories = data.data;
      // console.log(this.itemCategories);
    });
  }

  RunStart() {
    this.activatedRoute.paramMap.subscribe(
      (param) => {
        this.roomId = param.get("roomId");
        this.houseId = param.get("houseId");
        this.rsService.GetRoom(this.roomId).subscribe((data: any) => {
          this.room = data;
        });

        this.fetchingItems();
        this.ItemTotalValue();
        this.fetchingHomesUsingUserId();
      },
      (er) => console.log(er)
    );
  }

  switchSearchField() {
    this.isCategory = !this.isCategory;
  }

  ItemTotalValue() {
    this.itmsService.EstimatedTotalValue(this.roomId).subscribe(
      (data: any) => {
        this.totalValue = data.data[0].total_value
          ? data.data[0].total_value
          : 0;
      },
      (er) => console.log(er)
    );
  }

  fetchingItems() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itmsService.FetchItemsUsingRoomId(this.roomId).subscribe(
        (data: any) => {
          this.items = data.data;
          this.noItems = this.items.length == 0 ? true : false;
          loadingEl.dismiss();
        },
        (er) => console.log(er)
      );
    });
  }

  fetchingHomesUsingUserId() {
    this.authService.GetLoginUser().subscribe((data: any) => {
      this.hsService
        .FetchHousesUsingUserId(data.acc_id)
        .subscribe((data: any) => {
          this.houses = data.data;
        });
    });
  }

  onEditRoom() {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: "Edit",
            icon: "pencil",
            handler: () => {
              this.router.navigateByUrl(
                "/house/" + this.houseId + "/" + this.roomId + "/edit"
              );
            },
          },
          {
            text: "Delete",
            icon: "trash",
            handler: () => {
              this.onAlertCtrlAction("Delete");
            },
          },
          { text: "Cancel", icon: "close", role: "cancel" },
        ],
      })
      .then((actionSheetCtrlEl) => actionSheetCtrlEl.present());
  }

  onMoveItemAlertDisplay(itm_id: string) {
    this.onMoveItemAlert(
      "home",
      this.createHomeButtons("home", this.houses, itm_id)
    );
  }

  onMoveItemAlert(name: string, name_func: any) {
    this.actionSheetCtrl
      .create({
        header: "Choose " + name + " to move",
        buttons: name_func,
      })
      .then((actionSheetCtrlEl) => actionSheetCtrlEl.present());
  }

  onItemHasBeenMoved(rm_id: string) {
    // console.log(rm_id, this.item.itm_id);
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itmsService.MoveItem(rm_id, this.item.itm_id).subscribe((data) => {
        loadingEl.dismiss();
        this.router.navigateByUrl("/house/" + this.houseId);
        this.ToastNotification("moved", this.item.itm_name);
      });
    });
  }

  createHomeButtons(icon_name: string, any_array: any, itm_id?: string) {
    let buttons = [];
    for (let index in any_array) {
      let button = {
        text:
          icon_name == "home"
            ? any_array[index].hs_name
            : any_array[index].rm_name,
        icon: icon_name,
        handler: () => {
          // console.log(any_array[index].hs_id);
          if (icon_name == "home") {
            this.onHomeInside(any_array[index].hs_id, itm_id);
            // console.log(any_array[index].hs_id, itm_id);
          } else {
            let hs_name = this.houses.find(
              (houses) => houses.hs_id == any_array[index].rm_hs_id
            ).hs_name;
            // console.log("Move", any_array[index], hs_name, this.item.itm_name);
            this.onAlertCtrlAction(
              "Move",
              any_array[index],
              hs_name,
              this.item.itm_name
            );
          }
        },
      };
      buttons.push(button);
    }
    let button = {
      text: "Cancel",
      icon: "close",
      role: "cancel",
    };
    buttons.push(button);
    return buttons;
  }

  onHomeInside(hs_id: string, itm_id: string) {
    this.rsService.FetchRoomsUsingHouseId(hs_id).subscribe((data) => {
      this.rooms = data.data;
      this.rooms = this.rooms.filter((room) => room.rm_id != this.roomId);
      this.itmsService.GetItem(itm_id).subscribe((data) => {
        this.item = data;
      });

      this.hsService.GetHome(hs_id).subscribe((data) => {
        this.house = data;
      });

      this.onMoveItemAlert("room", this.createHomeButtons("key", this.rooms));
    });
  }

  onAlertCtrlAction(
    header: string,
    room?: any,
    house_name?: string,
    item_name?: string
  ) {
    this.alertCtrl
      .create({
        header: header + " Item...",
        message:
          header == "Delete"
            ? "Are you sure you want to delete " + this.room.rm_name
            : "Are you sure you want to move <b>" +
              item_name +
              "</b> to <br>House: <b>" +
              house_name +
              "</b> <br>Room: <b>" +
              room.rm_name +
              "</b>.",
        buttons: [
          {
            text: header == "Delete" ? "Delete Room" : "Move Item",
            handler: () => {
              if (header == "Delete") {
                this.onDeleteRoom();
              } else {
                this.onItemHasBeenMoved(room.rm_id);
              }
            },
          },
          { text: "Cancel", role: "cancel" },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  onDeleteRoom() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.rsService.DeleteRoom(this.roomId).subscribe((data) => {
        // console.log(data);
        loadingEl.dismiss();
        this.router.navigateByUrl("/house/" + this.houseId);
        this.ToastNotification("deleted", this.room.rm_name);
      });
    });
  }

  ToastNotification(action: string, name: string) {
    this.toastCtrl
      .create({
        message: name + " has been " + action,
        duration: 2000,
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }

  onChanged($event: { component: IonicSelectableComponent; value: any }) {
    if (!$event.value) {
      this.searchItems = false;
      this.fetchingItems();
      return;
    }

    if (this.items.length > 0) {
      this.items = [
        ...this.items.filter((item) => item.cat_id == $event.value.cat_id),
      ];
      this.searchItems = this.items.length <= 0 ? true : false;
    }
  }
}
