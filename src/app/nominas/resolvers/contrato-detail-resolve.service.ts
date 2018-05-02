import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContratoService } from '../services/contrato.service';
import { SeguridadService } from '../../seguridad/services/seguridad.service';
@Injectable()
export class ContratoDetailResolveService implements CanActivate, Resolve<any>{

  constructor(private contratoService: ContratoService, private seguridadService: SeguridadService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.contratoService.getContrato(this.seguridadService.getToken(), route.params.id)
  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

}
