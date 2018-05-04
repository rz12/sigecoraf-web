import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SeguridadService } from '../../seguridad/services/seguridad.service';
import { CargoService } from "../services/cargo.service";
import { PaginationService } from '../../shared/services/pagination.service';
@Injectable()
export class CargoListResolveService implements CanActivate, Resolve<any>{

  constructor(private paginationService: PaginationService, private cargoService: CargoService, private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.paginationService.loadPaginationData();
    return this.cargoService.cargosList(this.seguridadService.getToken().token, 1, this.paginationService.pageSize, "")
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

}
