import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { ItemStorageService } from "src/app/services/item-storage.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-item-add",
  templateUrl: "./item-add.page.html",
  styleUrls: ["./item-add.page.scss"],
})
export class ItemAddPage implements OnInit {
  form: FormGroup;
  houseId: string;
  roomId: string;
  imageURL: string = "";
  imageDefault: string = "assets/images/add item.png";
  itemCategories = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemStorageService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private file: File
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.houseId = param.get("houseId");
      this.roomId = param.get("roomId");
    });
    this.itemService.FetchingItemCategories().subscribe((data: any) => {
      this.itemCategories = data.data;
    });
    this.FormValidate();
  }

  FormValidate() {
    this.form = new FormGroup({
      itm_name: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_brand: new FormControl(null, {
        updateOn: "blur",
      }),
      itm_desc: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_shop: new FormControl(null, {
        updateOn: "blur",
      }),
      itm_price: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_qty: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      itm_img: new FormControl(null, {
        updateOn: "blur",
      }),
      itm_warranty_date: new FormControl(null, {
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

  onAlertCtrlCreate() {
    this.alertCtrl
      .create({
        header: "Create new Item...",
        message: "Are you sure you want to create new Item?",
        buttons: [
          {
            text: "Add Item",
            handler: () => {
              this.onAddItem();
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

  onAddItem() {
    let formData = this.form.value;
    let warrantyDate = formData.itm_warranty_date
      ? new Date(formData.itm_warranty_date).toISOString().slice(0, 10)
      : "0000-00-00";
    this.loadingCtrl.create().then((loadingEl) => {
      loadingEl.present();
      this.itemService
        .AddItem(
          this.roomId,
          formData.itm_name,
          formData.itm_brand,
          formData.itm_desc.cat_id,
          formData.itm_shop,
          formData.itm_price,
          formData.itm_qty,
          this.imageURL,
          warrantyDate
        )
        .subscribe(
          (data) => {
            loadingEl.dismiss();
            this.router.navigateByUrl(
              "/house/" + this.houseId + "/" + this.roomId
            );
            this.ToastNotification();
          },
          (err) => console.log(err)
        );
    });
  }
  ToastNotification() {
    this.toastCtrl
      .create({
        message: this.form.value.itm_name + " created successfully.",
        duration: 2000,
        color: "success",
        position: "top",
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }
}
