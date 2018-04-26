import { Injectable } from '@angular/core';
import { SeguridadService } from "../../seguridad/services/seguridad.service";
import { Observable } from 'rxjs/Observable';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConsolidadoRolPagoService } from "../services/consolidado-rol-pago.service";
@Injectable()
export class ConsolidadoRolpagoDetailResolveService implements CanActivate, Resolve<any> {

  constructor(private consolidadoRolPagoService: ConsolidadoRolPagoService, private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.consolidadoRolPagoService.getConsolidadoRolPago(this.seguridadService.getToken(), route.params.id)
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
