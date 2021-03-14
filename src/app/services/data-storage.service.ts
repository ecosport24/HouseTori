import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  // private var_url: string =
  //   // "https://housetori.000webhostapp.com/api_house_tori_v1.2/";
  private var_url: string = "http://192.168.1.30/api_house_tori_v1.2/";

  constructor(private http: HttpClient) {}

  Data_Server(api: string, data: any) {
    return this.http.post(this.var_url + api, JSON.stringify(data));
  }
}
