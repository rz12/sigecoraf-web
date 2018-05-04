import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PaginationService } from '../../shared/services/pagination.service';
import { ConsolidadoRolPagoService } from '../services/consolidado-rol-pago.service';
import { SeguridadService } from '../../seguridad/services/seguridad.service';
@Injectable()
export class ConsolidadoRolPagoListResolveService implements CanActivate, Resolve<any>{

  constructor(private paginationService: PaginationService, private consolidadoRolPagoService: ConsolidadoRolPagoService, private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.paginationService.loadPaginationData();
    return this.consolidadoRolPagoService.consolidadoRolPagoList(this.seguridadService.getToken().token, 1, this.paginationService.pageSize, "")
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
