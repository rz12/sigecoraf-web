import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class RolPagoService extends SharedService {

  constructor(private http: Http) {
    super();
  }

  rolPagoList(token, page, pageSize, filter) {
    return this.http.get(services.ws_nominas_rolPagos, this.options(token, null, page, pageSize, filter))
  }
  rolPagoByConsolidadoList(consolidadoROlPago, token, page, pageSize, filter) {
    let opciones = []
    let opcion = { "CONSOLIDADO_ROLPAGO": consolidadoROlPago }
    opciones.push(opcion)
    return this.http.get(services.ws_nominas_rolpago_list_by_consolidado, this.options(token, null, page, pageSize, filter, opciones))
  }
  save() {

  }
  createByConsolidadoRolPago(consolidadoRolPago, empresa, token) {
    let opciones = []
    let opcion = { "EMPRESA": empresa }
    let opcion1 = { "CONSOLIDADO_ROLPAGO": consolidadoRolPago }
    opciones.push(opcion)
    opciones.push(opcion1)
    return this.http.post(services.ws_nominas_rolPagos.concat("/0/").concat("create_by_consolidado_rolpago"), {},
      this.options(token, null, null, null, null, opciones)).map(res => res.json())
  }

}