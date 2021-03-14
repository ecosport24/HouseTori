import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthStorageService } from "./auth-storage.service";
import { DataStorageService } from "./data-storage.service";
import { HouseStorageService } from "./house-storage.service";
import { filterInput, moveItemData } from "./models/data-schema.model";
import { Item } from "./models/item.model";
import { RoomStorageService } from "./room-storage.service";

@Injectable({
  providedIn: "root",
})
export class ItemStorageService {
  private itemSubject = new BehaviorSubject<Item[]>(null);

  constructor(
    private dS: DataStorageService,
    private rsService: RoomStorageService,
    private hsService: HouseStorageService,
    private authService: AuthStorageService
  ) {}

  get item() {
    return this.itemSubject.asObservable();
  }

  FetchingAllItemsUsingUserId(acc_id: string) {
    let filterData = new filterInput();
    filterData.filter = acc_id;
    return this.dS.Data_Server("fetching_all_items", filterData).pipe(
      tap((data: any) => {
        this.itemSubject.next(data.data);
      })
    );
  }

  FetchItemsUsingRoomId(itm_rm_id: string) {
    let filterData = new filterInput();
    filterData.filter = itm_rm_id;
    return this.dS.Data_Server("select_all_item", filterData).pipe(
      tap((data: any) => {
        this.itemSubject.next(data.data);
      })
    );
  }

  EstimatedTotalValue(itm_rm_id: string) {
    let filterData = new filterInput();
    filterData.filter = itm_rm_id;
    return this.dS.Data_Server("estimate_room_total_value", filterData);
  }

  GetItem(itm_id: string) {
    return this.itemSubject.pipe(
      take(1),
      map((items) => {
        return { ...items.find((item) => item.itm_id == itm_id) };
      })
    );
  }

  UpdateItem(
    itm_id: string,
    itm_name: string,
    itm_brand: string,
    itm_desc: string,
    itm_shop: string,
    itm_price: string,
    itm_qty: string,
    itm_img: string,
    itm_warranty_date: string
  ) {
    let item: Item = {
      itm_id,
      itm_name,
      itm_brand,
      itm_desc,
      itm_shop,
      itm_price,
      itm_qty,
      itm_img,
      itm_warranty_date,
    };
    // console.log(item);
    return this.dS.Data_Server("update_item", item);
  }

  DeleteItem(itm_id: string) {
    let filterData = new filterInput();
    filterData.filter = itm_id;
    return this.dS.Data_Server("delete_item", filterData);
  }

  AddItem(
    itm_rm_id,
    itm_name,
    itm_brand,
    itm_desc,
    itm_shop,
    itm_price,
    itm_qty,
    itm_img,
    itm_warranty_date
  ) {
    let item: Item = {
      itm_rm_id,
      itm_name,
      itm_brand,
      itm_desc,
      itm_shop,
      itm_price,
      itm_qty,
      itm_img,
      itm_warranty_date,
    };
    return this.dS.Data_Server("add_item", item);
    // console.log(item);
  }
  MoveItem(rm_id: string, itm_id: string) {
    let moveData = new moveItemData();
    moveData.itm_rm_id = rm_id;
    moveData.itm_id = itm_id;
    return this.dS.Data_Server("move_item", moveData);
  }

  SearchItem(itm_id: string) {
    let filterData = new filterInput();
    filterData.filter = itm_id;
    return this.dS.Data_Server("get_item_and_room_id", filterData);
  }

  FetchingItemCategories() {
    return this.dS.Data_Server("select_all_item_categories", 1);
  }
}
