import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { HouseStorageService } from "src/app/services/house-storage.service";
import { Home } from "src/app/services/models/house.model";
import { Room } from "src/app/services/models/room.model";
import { RoomStorageService } from "src/app/services/room-storage.service";

@Component({
  selector: "app-room-list",
  templateUrl: "./room-list.page.html",
  styleUrls: ["./room-list.page.scss"],
})
export class RoomListPage implements OnInit {
  house: Home;
  rooms: Room[];
  houseId: any;
  imageURL: string = "assets/images/home.png";
  srcImage: string = "assets/images/rmadd.png";
  imageRoom: string = "assets/images/add room.png";
  constructor(
    private hsService: HouseStorageService,
    private rsService: RoomStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      if (!param.has("houseId")) {
        this.router.navigateByUrl("/house");
      }
      this.houseId = param.get("houseId");
      this.hsService.GetHome(this.houseId).subscribe((data: any) => {
        this.house = data;
      });
      this.loadingCtrl.create().then((loadingEl) => {
        loadingEl.present();
        this.rsService
          .FetchRoomsUsingHouseId(this.houseId)
          .subscribe((data: any) => {
            this.rooms = data.data;
            loadingEl.dismiss();
          });
      });
    });
  }

  onEditHome() {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: "Edit",
            icon: "pencil",
            handler: () => {
              this.router.navigateByUrl("/house/" + this.houseId + "/edit");
            },
          },
          {
            text: "Delete",
            icon: "trash",
            handler: () => {
              this.onAlertCtrlDelete();
            },
          },
          { text: "Cancel", icon: "close", role: "cancel" },
        ],
      })
      .then((actionSheetCtrlEl) => actionSheetCtrlEl.present());
  }

  onAlertCtrlDelete() {
    this.alertCtrl
      .create({
        header: "Delete House...",
        message: "Are you sure you want to delete " + this.house.hs_name,
        buttons: [
          {
            text: "Delete Home",
            handler: () => {
              this.onDeleteHome();
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

  onDeleteHome() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.hsService.DeleteHome(this.houseId).subscribe((data) => {
        this.router.navigateByUrl("/house");
        this.ToastNotification();
        loadingEl.dismiss();
      });
    });
  }

  ToastNotification() {
    this.toastCtrl
      .create({
        message: this.house.hs_name + " deleted successfully.",
        duration: 2000,
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }
}
