import { Injectable } from '@angular/core';
import { IRolPago } from '../dto/i-rol-pago';
import { Observable } from 'rxjs/Observable';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class RolPagoService extends SharedService {

  constructor(private http: Http) {
    super();
  }

   rolPagoList(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_nominas_rolPagos, options)
  }
  save() {

  }
 

}