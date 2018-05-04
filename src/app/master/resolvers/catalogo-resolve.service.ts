import { Injectable } from '@angular/core';
import { Resolve, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CatalogoService } from "../services/catalogo.service";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CatalogoResolveService implements Resolve<any> {

  constructor(private catalogoService: CatalogoService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

  }
}
