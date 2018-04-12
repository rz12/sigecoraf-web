import { Injectable } from '@angular/core';
import { IContrato } from '../dto/i-contrato';
import { Observable } from 'rxjs/Observable';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from "@angular/http";
@Injectable()
export class ContratoService extends SharedService {

  constructor(private http: Http) {
    super();
  }

  contratosList(token, page, pageSize, filter) {
    return this.http.get(services.ws_nominas_contratos, this.options(token, page, pageSize, filter))
  }
  save(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null);
    if (!data.id) {

      return this.http.post(services.ws_nominas_contratos, body, options).map(res => res.json())
    }
    return this.http.put(services.ws_nominas_contratos.concat('/').concat(data.id), body, options).map(res =>
      res.json())
  }
  public getContrato(token, id) {
    return this.http.get(services.ws_nominas_contratos.concat('/').concat(id), this.options(token, null, null, null))
  }
}
