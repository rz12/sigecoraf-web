import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PaginationService } from '../../shared/services/pagination.service';
import { EmpleadoService } from '../services/empleado.service';
import { SeguridadService } from '../../seguridad/services/seguridad.service';
@Injectable()
export class EmpleadoListResolveService implements CanActivate, Resolve<any> {

  constructor(private paginationService: PaginationService, private empleadoService: EmpleadoService, private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.empleadoService.empleadosList(this.seguridadService.getToken().token, 1, this.paginationService.pageSize, "")
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

}
