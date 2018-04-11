import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { services } from "../../credentials";
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../shared/services/shared.service';
import { Parametrizacion } from '../models/parametrizacion';
import "rxjs/add/operator/map";
@Injectable()
export class ParametrizacionService extends SharedService {
  constructor(private http: Http) {
    super();
  }
  public parametros: Parametrizacion[];

  getParametrizaciones(token) {
    return this.http.get(services.ws_master_parametrizaciones, this.options(token, null, null)).map(res =>
      res.json())
  }
}
