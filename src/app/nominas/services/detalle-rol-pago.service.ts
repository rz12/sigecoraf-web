import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SharedService } from '../../shared/services/shared.service';
import { services } from '../../credentials';

@Injectable()
export class DetalleRolPagoService extends SharedService {

  constructor(private http: Http) {
    super();
  }
  detalleRolPagoByRolPagoList(RolPago, token, page, pageSize, filter) {
    let opciones = []
    let opcion = { "ROL_PAGO": RolPago }
    opciones.push(opcion)
    return this.http.get(services.ws_nominas_detalle_rol_pago_list_by_rolpago, this.options(token, null, page, pageSize, filter, opciones))
  }
  createByRolPago(rolPago, empresa, token) {
    let opciones = []
    let opcion = { "EMPRESA": empresa }
    let opcion1 = { "ROL_PAGO": rolPago }
    opciones.push(opcion)
    opciones.push(opcion1)
    return this.http.post(services.ws_nominas_detalle_rol_pago.concat("/0/").concat("create_detalles_by_rolpago"), {},
      this.options(token, null, null, null, null, opciones)).map(res => res.json())
  }
  getValorByRule(detalleRolPago) {
    let opciones = []
    let opcion = { "DETALLE_ROL_PAGO": JSON.stringify(detalleRolPago) }
    opciones.push(opcion)
    return this.http.get(services.ws_nominas_detalle_rol_pago_get_valor_by_rule, this.options(null, null, null, null, null, opciones))
  }
}
