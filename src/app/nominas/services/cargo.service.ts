import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { services } from "../../credentials";
import { ICargo } from "../dto/i-cargo";
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from "@angular/http";
@Injectable()
export class CargoService extends SharedService {

  constructor(private http: Http) {
    super();
  }

  cargosList(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_nominas_cargos, options)
  }
  save() {

  }

}
