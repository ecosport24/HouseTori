import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { Room } from "src/app/services/models/room.model";
import { RoomStorageService } from "src/app/services/room-storage.service";

import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
@Component({
  selector: "app-room-edit",
  templateUrl: "./room-edit.page.html",
  styleUrls: ["./room-edit.page.scss"],
})
export class RoomEditPage implements OnInit {
  form: FormGroup;
  imageURL: string = "";
  roomId: string;
  houseId: string;
  room: Room;
  imageDefault: string = "assets/images/rmadd.png";

  constructor(
    private rsService: RoomStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.roomId = param.get("roomId");
      this.houseId = param.get("houseId");

      this.rsService.GetRoom(this.roomId).subscribe((data: any) => {
        this.room = data;
        this.imageURL = this.room.rm_img;
        this.FormValidate();
      });
    });
  }

  getGallery() {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL,
        targetHeight: 600,
        targetWidth: 600,
      })
      .then((imageData) => {
        this.imageURL = "data:image/jpeg;base64," + imageData;
      })
      .catch((e) => console.log(e));
  }

  takePhoto() {
    let options: CameraOptions = {
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 600,
      targetHeight: 600,
    };

    this.camera
      .getPicture(options)
      .then((imageData) => {
        let filename = imageData.substring(imageData.lastIndexOf("/") + 1);
        let path = imageData.substring(0, imageData.lastIndexOf("/") + 1);
        this.file.readAsDataURL(path, filename).then((base64data) => {
          this.imageURL = base64data;
        });
      })
      .catch((e) => console.log(e));
  }

  FormValidate() {
    this.form = new FormGroup({
      rm_name: new FormControl(this.room.rm_name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  onAlertCtrlUpdate() {
    this.alertCtrl
      .create({
        header: "Update Room...",
        message: "Are you sure you want to update " + this.room.rm_name,
        buttons: [
          {
            text: "Update Room",
            handler: () => {
              this.onEditRoom();
            },
          },
          { text: "Cancel", role: "cancel" },
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  onEditRoom() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.rsService
        .UpdateRoom(this.roomId, this.form.value.rm_name, this.imageURL)
        .subscribe((data) => {
          console.log(data);
          loadingEl.dismiss();
          this.router.navigateByUrl("/house/" + this.houseId);
          this.ToastNotification();
        });
    });
  }

  ToastNotification() {
    this.toastCtrl
      .create({
        message: this.form.value.rm_name + " has been updated.",
        duration: 2000,
        color: "primary",
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }
}
