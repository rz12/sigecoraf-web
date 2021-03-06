import { Injectable } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";
import { Http } from '@angular/http';
import { services } from "../../credentials";
@Injectable()
export class ItemService extends SharedService {

  constructor(private http: Http) {
    super();
  }
  public getItem(token, id) {
    return this.http.get(services.ws_master_items.concat('/').concat(id), this.options(token, null, null, null, ""))
  }

}
