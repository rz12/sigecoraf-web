import { Injectable } from '@angular/core';
import { IRolPago } from '../dto/i-rol-pago';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';

@Injectable()
export class RolPagoService extends SharedService {

  constructor(private http: HttpClient) {
    super();
  }

  rolPagoList(token): Observable<IRolPago> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let httpOptions = {
      headers: headers
    };
    return this.http.get<IRolPago>(services.ws_nominas_rolPagos, httpOptions)
  }

}
