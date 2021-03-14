import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { AuthStorageService } from "src/app/services/auth-storage.service";
import { HouseStorageService } from "src/app/services/house-storage.service";

@Component({
  selector: "app-house-add",
  templateUrl: "./house-add.page.html",
  styleUrls: ["./house-add.page.scss"],
})
export class HouseAddPage implements OnInit {
  cameraImg = "assets/images/add home.png";
  form: FormGroup;
  userId: string;
  imageURL: string = "";

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private hsService: HouseStorageService,
    private authService: AuthStorageService
  ) {}

  ngOnInit() {
    this.FormValidateRunStart();
  }
  FormValidateRunStart() {
    this.authService.GetLoginUser().subscribe((data: any) => {
      this.userId = data.acc_id;
    });

    this.form = new FormGroup({
      hs_name: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  onAlertCtrlCreate() {
    this.alertCtrl
      .create({
        header: "Create new house...",
        message: "Are you sure you want to create new house?",
        buttons: [
          {
            text: "Add Home",
            handler: () => {
              this.onAddHome();
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

  onAddHome() {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.hsService
        .AddHome(this.form.value.hs_name, this.imageURL, this.userId)
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
        message: this.form.value.hs_name + " created successfully.",
        duration: 2000,
        color: "success",
        position: "top",
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }
}
