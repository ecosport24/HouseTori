import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { DataStorageService } from "./data-storage.service";
import { filterInput } from "./models/data-schema.model";
import { Home } from "./models/house.model";

@Injectable({
  providedIn: "root",
})
export class HouseStorageService {
  private homeSubject = new BehaviorSubject<Home[]>(null);

  constructor(private dsService: DataStorageService) {}

  FetchHousesUsingUserId(acc_id: string) {
    let filterData = new filterInput();
    filterData.filter = acc_id;
    return this.dsService.Data_Server("select_all_home", filterData).pipe(
      tap((data: any) => {
        this.homeSubject.next(data.data);
      })
    );
  }

  GetHome(hs_id: string) {
    return this.homeSubject.pipe(
      take(1),
      map((houses: any) => {
        return { ...houses.find((house) => house.hs_id == hs_id) };
      })
    );
  }

  AddHome(hs_name: string, hs_img: string, hs_acc_id: string) {
    let home: Home = { hs_name, hs_img, hs_acc_id };
    return this.dsService.Data_Server("add_home", home);
  }

  UpdateHome(hs_id: string, hs_name: string, hs_img: string) {
    let home: Home = { hs_id, hs_name, hs_img };
    return this.dsService.Data_Server("update_home", home);
  }

  DeleteHome(hs_id: string) {
    let filterData = new filterInput();
    filterData.filter = hs_id;
    return this.dsService.Data_Server("delete_home", filterData);
  }
}
