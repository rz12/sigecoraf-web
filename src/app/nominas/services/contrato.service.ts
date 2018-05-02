import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { services, enums } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { Http } from "@angular/http";
@Injectable()
export class ContratoService extends SharedService {

  constructor(private http: Http) {
    super();
  }

  contratosList(token, page, pageSize, filter) {
    return this.http.get(services.ws_nominas_contratos, this.options(token, enums.MENU_CONTRATOS, page, pageSize, filter))
  }

  save(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    if (!data.id) {
      return this.http.post(services.ws_nominas_contratos, body, options).map(res => res.json())
    }
    return this.http.put(services.ws_nominas_contratos.concat('/').concat(data.id), body, options).map(res =>
      res.json())
  }
  public getContrato(token, id) {
    return this.http.get(services.ws_nominas_contratos.concat('/').concat(id), this.options(token, null, null, null, ""))
  }
  public getContratoEmpleado(token, id) {
    return this.http.get(services.ws_nominas_contrato_empleado.concat('/').concat(id), this.options(token, null, null, null, ""))
  }
  delete(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    if (data.id) {
      return this.http.delete(services.ws_nominas_contratos.concat("/").concat(data.id), options).map(res => res.json())
    }
  }
}
