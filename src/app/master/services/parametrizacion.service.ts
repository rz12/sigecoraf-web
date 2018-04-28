import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { services, enums } from "../../credentials";
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../shared/services/shared.service';
import { Parametrizacion } from '../models/parametrizacion';
import "rxjs/add/operator/map";
@Injectable()
export class ParametrizacionService extends SharedService {
  private parametros: Parametrizacion[];

  constructor(private http: Http) {
    super();
    this.parametros = [];
  }

  getParametrizaciones(token): Observable<any> {
    return this.http.get(services.ws_master_parametrizaciones, this.options(token, null, null, null, null)).map(res =>
      res.json())
  }
  getParametros() {
    return localStorage.getItem(enums.SISTEMA_PARAM) ? JSON.parse(localStorage.getItem(enums.SISTEMA_PARAM)) : this.parametros;
  }
  setParametros(parametros) {
    this.parametros = parametros
  }
}
