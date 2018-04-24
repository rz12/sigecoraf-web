import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EmpleadoService } from '../services/empleado.service';
import { SeguridadService } from '../../seguridad/services/seguridad.service';
@Injectable()
export class EmpleadoResolveService implements Resolve<any>{

  constructor(private empleadoService: EmpleadoService, private seguridadService: SeguridadService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.empleadoService.getEmpleado(this.seguridadService.getToken(), route.params.id).map(res => res.json().data);
  }
}
