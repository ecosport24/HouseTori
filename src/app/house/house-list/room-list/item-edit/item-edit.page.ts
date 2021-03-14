import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { ItemStorageService } from "src/app/services/item-storage.service";
import { Item } from "src/app/services/models/item.model";
@Component({
  selector: "app-item-edit",
  templateUrl: "./item-edit.page.html",
  styleUrls: ["./item-edit.page.scss"],
})
export class ItemEditPage implements OnInit {
  item: Item;
  form: FormGroup;
  houseId: string;
  roomId: string;
  itemId: string;
  imageDefault: string = "assets/images/item.png";
  imageURL: string = "";
  itemCategories = [];
  itm_cat: any;

  constructor(
    private router: Router,
    private actuvatedRoute: ActivatedRoute,
    private itmService: ItemStorageService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File
  ) {}

  ngOnInit() {
    this.RunStart();
  }

  RunStart() {
    this.actuvatedRoute.paramMap.subscribe(
      (param) => {
        this.houseId = param.get("houseId");
        this.roomId = param.get("roomId");
        this.itemId = param.get("itemId");
        this.itmService.GetItem(this.itemId).subscribe(
          (data: any) => {
            this.item = data;
            this.imageURL = this.item.itm_img;
            this.FormValidate();
            this.itmService.FetchingItemCategories().subscribe(
              (data: any) => {
                this.itemCategories = data.data;
                this.itm_cat = {
                  cat_id: this.item.cat_id,
                  cat_name: this.item.cat_name,
                };
              },
              (er) => console.log(er)
            );
          },
          (er) => console.log(er)
        );
      },
      (er) => console.log(er)
    );
  }

  FormValidate() {
    this.form = new FormGroup({
      itm_name: new FormControl(this.item.itm_name, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_brand: new FormControl(this.item.itm_brand, {
        updateOn: "blur",
      }),
      itm_desc: new FormControl(this.item.cat_id, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_shop: new FormControl(this.item.itm_shop, {
        updateOn: "blur",
      }),
      itm_price: new FormControl(this.item.itm_price, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_qty: new FormControl(this.item.itm_qty, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_img: new FormControl(this.item.itm_img, {
        updateOn: "blur",
      }),
      itm_warranty_date: new FormControl(this.item.itm_warranty_date, {
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
        header: "Update Item...",
        message: "Are you sure you want to update " + this.form.value.itm_name,
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
    let warrantyDate = data.itm_warranty_date
      ? new Date(data.itm_warranty_date).toISOString().slice(0, 10)
      : "0000-00-00";
    // console.log(this.itm_cat);
    // console.log(this.itm_cat.cat_id);

    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itmService
        .UpdateItem(
          this.itemId,
          data.itm_name,
          data.itm_brand,
          this.itm_cat.cat_id,
          data.itm_shop,
          data.itm_price,
          data.itm_qty,
          this.imageURL,
          warrantyDate
        )
        .subscribe((data) => {
          this.router.navigateByUrl(
            "/house/" + this.houseId + "/" + this.roomId
          );
          this.ToastNotification();
          loadingEl.dismiss();
        });
    });
  }

  ToastNotification() {
    this.toastCtrl
      .create({
        message: this.form.value.itm_name + " has been updated successfully",
        duration: 2000,
        color: "primary",
        position: "top",
      })
      .then((toastEl) => toastEl.present());
  }
}
