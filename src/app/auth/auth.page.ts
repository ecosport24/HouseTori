import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, IonSlides, LoadingController } from "@ionic/angular";
import { AuthStorageService } from "../services/auth-storage.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  slideOpts = {
    initialSlide: 1,
    speed: 500,
    slidesPerView: 1,
  };

  isLogin: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.authService.FetchAllAccounts().subscribe((data) => console.log(data));
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
    this.slides.lockSwipes(false);
    if (this.isLogin) {
      this.slides.slideTo(0);
    } else {
      this.slides.slideTo(1);
    }
    this.slides.lockSwipes(true);
  }

  AlertCtrlNotif(header: string, msg: string) {
    this.alertCtrl
      .create({
        header: header,
        message: msg,
        buttons: [{ text: "OK", role: "cancel" }],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  LoginForm(form: any) {
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.authService.Login(form).subscribe((data: any) => {
        if (data.code == "220") {
          this.AlertCtrlNotif(
            "Authentication Failed..",
            "Invalid email or password <br/>please try again."
          );
        } else {
          if (form.acc_email != "admin@housetori.com") {
            this.router.navigateByUrl("/house");
          } else {
            this.router.navigateByUrl("/admin");
          }
        }
        loadingEl.dismiss();
      });
    });
  }

  SingupForm(form: any) {
    if (form.acc_password !== form.confirm_password) {
      this.AlertCtrlNotif(
        "Invalid Password..",
        " The password you entered doesn't match"
      );
    } else {
      this.loadingCtrl.create().then((loadingEl) => {
        loadingEl.present();
        this.authService.AddUser(form).subscribe((data: any) => {
          if (data.data.length > 0) {
            this.AlertCtrlNotif(
              "Registration Failed.",
              "The email address you've entered is already assigned to an existing account."
            );
            console.log(data);
          } else {
            this.AlertCtrlNotif(
              "Successfully Registration.",
              "The email and password of your account is successfully sent to your email."
            );
            this.onSwitch();
            console.log(data);
          }
          loadingEl.dismiss();
        });
      });
    }
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (this.isLogin) {
      this.LoginForm(form.value);
    } else {
      this.SingupForm(form.value);
    }
  }
}
