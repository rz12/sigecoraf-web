import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PaginationService } from '../../shared/services/pagination.service';
import { SeguridadService } from '../../seguridad/services/seguridad.service';
import { ContratoService } from '../services/contrato.service';
@Injectable()
export class ContratoListResolveService implements CanActivate, Resolve<any>{

  constructor(private paginationService: PaginationService, private contratoService: ContratoService,
    private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.paginationService.loadPaginationData();
    return this.contratoService.contratosList(this.seguridadService.getToken().token, 1, this.paginationService.pageSize, "")
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

}
