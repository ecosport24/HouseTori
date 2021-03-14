import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { HouseStorageService } from "src/app/services/house-storage.service";
import { Home } from "src/app/services/models/house.model";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-house-edit",
  templateUrl: "./house-edit.page.html",
  styleUrls: ["./house-edit.page.scss"],
})
export class HouseEditPage implements OnInit {
  form: FormGroup;
  house: Home;
  userId: string;
  houseId: any;
  imageURL: string = "";
  imageDefault = "assets/images/add home.png";

  constructor(
    private router: Router,
    private hsService: HouseStorageService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private authService: AuthStorageService,
    private camera: Camera,
    private file: File
  ) {}

  ngOnInit() {
    this.FormValidateRunStart();
  }

  FormValidateRunStart() {
    this.activatedRoute.paramMap.subscribe((param) => {
      if (!param.has("houseId")) {
        this.router.navigateByUrl("/home");
      }
      this.houseId = param.get("houseId");
      this.hsService.GetHome(this.houseId).subscribe((data: any) => {
        this.house = data;
        this.imageURL = this.house.hs_img;
      });
    });

    this.form = new FormGroup({
      hs_name: new FormControl(this.house.hs_name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
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

  onAlertCtrlUpdate() {
    this.alertCtrl
      .create({
        header: "Update House...",
        message: "Are you sure you want to update " + this.form.value.hs_name,
        buttons: [
          {
            text: "Update Home",
            handler: () => {
              this.onUpdate();
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

  onUpdate() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.hsService
        .UpdateHome(this.houseId, this.form.value.hs_name, this.imageURL)
        .subscribe((data) => {
          this.router.navigateByUrl("/house");
          this.ToastNotification();
          loadingEl.dismiss();
        });
    });
  }

  ToastNotification() {
    this.toastCtrl
      .create({
        message: this.form.value.hs_name + " has been updated successfully",
        duration: 2000,
        color: "primary",
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }
}
