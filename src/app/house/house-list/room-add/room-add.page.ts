import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { RoomStorageService } from "src/app/services/room-storage.service";

@Component({
  selector: "app-room-add",
  templateUrl: "./room-add.page.html",
  styleUrls: ["./room-add.page.scss"],
})
export class RoomAddPage implements OnInit {
  houseId: string;
  form: FormGroup;
  imageURL: string = "";
  imageDefault: string = "assets/images/add room.png";

  constructor(
    private router: Router,
    private rsService: RoomStorageService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.houseId = param.get("houseId");
      this.FormValidate();
    });
  }

  FormValidate() {
    this.form = new FormGroup({
      rm_name: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }
  onAlertCtrlCreate() {
    this.alertCtrl
      .create({
        header: "Create new room...",
        message: "Are you sure you want to create new room?",
        buttons: [
          {
            text: "Add Room",
            handler: () => {
              this.onAddRoom();
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onAddRoom() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.rsService
        .AddRoom(this.houseId, this.form.value.rm_name, this.imageURL)
        .subscribe((data) => {
          loadingEl.dismiss();
          this.router.navigateByUrl("/house/" + this.houseId);
          this.ToastNotification();
        });
    });
  }

  ToastNotification() {
    this.toastCtrl
      .create({
        message: this.form.value.rm_name + " created successfully.",
        duration: 2000,
        color: "success",
        position: "top",
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }
}
