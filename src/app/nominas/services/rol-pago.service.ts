import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { Http, Headers, RequestOptions, ResponseContentType } from "@angular/http";

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
  updateWithDetalles(data, token) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    return this.http.put(services.ws_nominas_rolPagos.concat("/" + data.id).concat("/update_with_detalles"), body,
      this.options(token, null, null, null, null)).map(res => res.json())
  }
  generarReporte(data, token) {
    let body = JSON.stringify(data);
    let options = new RequestOptions();
    options.responseType = ResponseContentType.Blob;
    this.http.post(services.ws_reportes_nominas_rol_pago, data, options).subscribe(res => {
      let blob = new Blob([(res['_body'])],
        { type: res.headers.get("Content-Type") }
      );
      let urlCreator = window.URL;
      window.open(urlCreator.createObjectURL(blob))
    });

  }
}