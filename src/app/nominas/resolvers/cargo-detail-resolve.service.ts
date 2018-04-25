import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CargoService } from "../services/cargo.service";
import { SeguridadService } from "../../seguridad/services/seguridad.service";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CargoDetailResolveService implements CanActivate, Resolve<any>{

  constructor(private cargoService: CargoService, private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.cargoService.getCargo(this.seguridadService.getToken(), route.params.id)
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}
