import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { services, enums } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class CargoService extends SharedService {

  constructor(private http: Http) {
    super();
  }

  cargosList(token, page, pageSize, filter) {
    return this.http.get(services.ws_nominas_cargos, this.options(token, enums.MENU_CARGOS, page, pageSize, filter))
  }
  save(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    if (!data.id) {

      return this.http.post(services.ws_nominas_cargos, body, options).map(res => res.json())
    }
    return this.http.put(services.ws_nominas_cargos.concat('/').concat(data.id), body, options).map(res =>
      res.json())
  }
  public getCargo(token, id) {
    return this.http.get(services.ws_nominas_cargos.concat('/').concat(id), this.options(token, null, null, null, ""))
  }
}
