import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { User } from "src/app/services/models/user-model";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.page.html",
  styleUrls: ["./profile-edit.page.scss"],
})
export class ProfileEditPage implements OnInit {
  imageURL = "assets/images/me.png";
  form: FormGroup;
  user: User;
  userImage = "";
  constructor(
    private authService: AuthStorageService,
    private camera: Camera,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private file: File
  ) {}

  ngOnInit() {
    this.authService.GetLoginUser().subscribe((data) => {
      this.user = data;
      this.userImage = this.user.acc_img;
      // console.log(this.user);
    });
    this.RunStart();
  }

  RunStart() {
    this.form = new FormGroup({
      acc_first_name: new FormControl(this.user.acc_first_name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      acc_last_name: new FormControl(this.user.acc_last_name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      acc_email: new FormControl(this.user.acc_email, {
        updateOn: "blur",
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
        this.userImage = "data:image/jpeg;base64," + imageData;
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
          this.userImage = base64data;
        });
      })
      .catch((e) => console.log(e));
  }

  onAlertCtrlUpdate() {
    this.alertCtrl
      .create({
        header: "Update Item...",
        message: "Are you sure you want to update the changes.",
        buttons: [
          {
            text: "Update Item",
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
    let data = this.form.value;
    console.log(data);
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.authService
        .UpdateUser(
          data.acc_first_name,
          data.acc_last_name,
          data.acc_email,
          this.userImage,
          this.user.acc_id
        )
        .subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl("/");
          this.ToastNotification();
          loadingEl.dismiss();
        });
    });
  }

  ToastNotification() {
    this.toastCtrl
      .create({
        message: "Profile has been updated successfully",
        duration: 2000,
        color: "primary",
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }
}
