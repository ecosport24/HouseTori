import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { HouseStorageService } from "src/app/services/house-storage.service";
import { ItemStorageService } from "src/app/services/item-storage.service";
import { Home } from "src/app/services/models/house.model";
import { Item } from "src/app/services/models/item.model";
import { Room } from "src/app/services/models/room.model";
import { RoomStorageService } from "src/app/services/room-storage.service";

@Component({
  selector: "app-item-info",
  templateUrl: "./item-info.page.html",
  styleUrls: ["./item-info.page.scss"],
})
export class ItemInfoPage implements OnInit {
  houseId: string;
  roomId: string;
  itemId: string;
  item: Item;
  rooms: Room[];
  houses: Home[];
  imageDefault: string = "assets/images/item.png";
  warrantyDate: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itmService: ItemStorageService,
    private rsService: RoomStorageService,
    private hsService: HouseStorageService,
    private authService: AuthStorageService,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.houseId = param.get("houseId");
      this.roomId = param.get("roomId");
      this.itemId = param.get("itemId");
      this.itmService.GetItem(this.itemId).subscribe((data: any) => {
        this.item = data;
        this.warrantyDate =
          this.item.itm_warranty_date != "0000-00-00"
            ? new Date(this.item.itm_warranty_date).toDateString()
            : "NONE";
        // this.dateToday = new Date().toISOString().slice(0, 10);
      });
      this.authService.GetLoginUser().subscribe((data: any) => {
        this.hsService
          .FetchHousesUsingUserId(data.acc_id)
          .subscribe((data: any) => {
            this.houses = data.data;
          });
      });
    });
  }

  onEditItem() {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: "Move",
            icon: "move",
            handler: () => {
              this.onMoveItemDisplay(
                "home",
                this.createHomeButtons("home", this.houses)
              );
              this.actionSheetCtrl.dismiss();
            },
          },
          {
            text: "Edit",
            icon: "pencil",
            handler: () => {
              this.router.navigateByUrl(
                "/house/" +
                  this.houseId +
                  "/" +
                  this.roomId +
                  "/" +
                  this.itemId +
                  "/edit"
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

  onMoveItemDisplay(name: string, name_func: any) {
    this.actionSheetCtrl
      .create({
        header: "Choose " + name + " to move",
        buttons: name_func,
      })
      .then((actionSheetCtrlEl) => actionSheetCtrlEl.present());
  }

  createHomeButtons(icon_name: string, any_array: any) {
    let buttons = [];
    for (let index in any_array) {
      let button = {
        text:
          icon_name == "home"
            ? any_array[index].hs_name
            : any_array[index].rm_name,
        icon: icon_name,
        handler: () => {
          if (icon_name == "home") {
            this.onHomeInside(any_array[index].hs_id);
          } else {
            let hs_name = this.houses.find(
              (houses) => houses.hs_id == any_array[index].rm_hs_id
            ).hs_name;
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

  onHomeInside(hs_id: string) {
    this.rsService.FetchRoomsUsingHouseId(hs_id).subscribe((data) => {
      this.rooms = data.data;
      console.log(this.rooms);
      this.rooms = this.rooms.filter((room) => room.rm_id != this.roomId);
      console.log(this.rooms);
      this.onMoveItemDisplay("room", this.createHomeButtons("key", this.rooms));
    });
  }

  onDeleteItem() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itmService.DeleteItem(this.itemId).subscribe((data) => {
        // console.log(data);
        this.router.navigateByUrl("/house/" + this.houseId + "/" + this.roomId);
        this.ToastNotification("delete");
        loadingEl.dismiss();
      });
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
            ? "Are you sure you want to delete " + this.item.itm_name
            : "Are you sure you want to move <b>" +
              item_name +
              "</b> to <br>House: <b>" +
              house_name +
              "</b> <br>Room: <b>" +
              room.rm_name +
              "</b>.",
        buttons: [
          {
            text: header == "Delete" ? "Delete Item" : "Move Item",
            handler: () => {
              if (header == "Delete") {
                this.onDeleteItem();
              } else {
                this.onItemMoved(room.rm_id);
              }
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  onItemMoved(rm_id: string) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itmService.MoveItem(rm_id, this.itemId).subscribe((data) => {
        loadingEl.dismiss();
        this.router.navigateByUrl("/house/" + this.houseId);
        this.ToastNotification("moved");
      });
    });
  }

  ToastNotification(action: string) {
    this.toastCtrl
      .create({
        message: this.item.itm_name + " " + action + " successfully.",
        duration: 2000,
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }
}
