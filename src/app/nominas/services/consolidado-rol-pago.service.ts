import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Http } from '@angular/http';
import { services, enums } from '../../credentials';

@Injectable()
export class ConsolidadoRolPagoService extends SharedService {

  constructor(private http: Http) {
    super()
  }
  consolidadoRolPagoList(token, page, pageSize, filter) {
    return this.http.get(services.ws_nominas_consolido_rol_pago, this.options(token, enums.MENU_CONSOLIDADOS, page, pageSize, filter))
  }
  save(token, data) {
    let body = JSON.stringify(data);
    let options = this.options(token, null, null, null, "");
    if (!data.id) {

      return this.http.post(services.ws_nominas_consolido_rol_pago, body, options).map(res => res.json())
    }
    return this.http.put(services.ws_nominas_empleados.concat('/').concat(data.id), body, options).map(res =>
      res.json())
  }
  public getConsolidadoRolPago(token, id) {
    return this.http.get(services.ws_nominas_consolido_rol_pago.concat('/').concat(id), this.options(token, null, null, null, ""))
  }

}
