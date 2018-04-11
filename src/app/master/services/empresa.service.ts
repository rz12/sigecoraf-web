import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { services } from "../../credentials";
import { SharedService } from '../../shared/services/shared.service';
import { Http, Headers, RequestOptions } from "@angular/http";
import { IEmpresa } from "../dto/i-empresa";
import { catchError } from 'rxjs/operators';
@Injectable()
export class EmpresaService {

  constructor(private http: Http) {
  }
  public empresaList(token) {
    let data: IEmpresa;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_master_empresas, options);
  }
}
