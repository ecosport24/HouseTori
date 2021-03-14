import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { DataStorageService } from "./data-storage.service";
import { filterInput } from "./models/data-schema.model";
import { Room } from "./models/room.model";

@Injectable({
  providedIn: "root",
})
export class RoomStorageService {
  private roomSubject = new BehaviorSubject<Room[]>(null);

  constructor(private dsService: DataStorageService) {}

  get rooms() {
    return this.roomSubject.asObservable();
  }

  FetchingAllRooms() {
    return this.dsService.Data_Server("fetching_all_room", 1).pipe(
      tap((data: any) => {
        this.roomSubject.next(data.data);
      })
    );
  }

  FetchRoomsUsingHouseId(hs_id: string) {
    let filterData = new filterInput();
    filterData.filter = hs_id;
    return this.dsService.Data_Server("select_all_room", filterData).pipe(
      tap((data: any) => {
        this.roomSubject.next(data.data);
      })
    );
  }

  GetRoom(rm_id: string) {
    return this.roomSubject.pipe(
      take(1),
      map((rooms: any) => {
        return { ...rooms.find((rooms) => rooms.rm_id == rm_id) };
      })
    );
  }

  AddRoom(rm_hs_id: string, rm_name: string, rm_img: string) {
    let room: Room = { rm_name, rm_img, rm_hs_id };
    return this.dsService.Data_Server("add_room", room);
  }

  UpdateRoom(rm_id: string, rm_name: string, rm_img: string) {
    let room: Room = { rm_name, rm_img, rm_id };
    return this.dsService.Data_Server("update_room", room);
  }

  DeleteRoom(rm_id: string) {
    let filterData = new filterInput();
    filterData.filter = rm_id;
    return this.dsService.Data_Server("delete_room", filterData);
  }
}
