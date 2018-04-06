import { Injectable } from '@angular/core';
import { IContrato } from '../dto/i-contrato';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';


@Injectable()
export class ContratoService extends SharedService{

  constructor(private http: HttpClient) {
  super();
   }

  contratosList(token): Observable<IContrato> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let httpOptions = {
      headers: headers
    };
    return this.http.get<IContrato>(services.ws_nominas_contratos, httpOptions)
  }
 

}
