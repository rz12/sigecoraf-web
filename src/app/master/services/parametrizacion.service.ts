import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { services } from "../../credentials";
import { IParametrizacion } from "../../master/dto/i-parametrizacion";
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import "rxjs/Rx";
@Injectable()
export class ParametrizacionService {
  constructor(private http: HttpClient) { }
  private parametros: IParametrizacion

  getParametrizaciones(token): Observable<IParametrizacion> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let httpOptions = {
      headers: headers
    };
    return this.http.get<IParametrizacion>(services.ws_master_parametrizaciones, httpOptions)

  }
}
