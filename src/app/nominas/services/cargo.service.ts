import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { services } from "../../credentials";
import { ICargo } from "../dto/i-cargo";
import { SharedService } from '../../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class CargoService extends SharedService {

  constructor(private http: HttpClient) {
    super();
  }

  getMenus(token): Observable<ICargo> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let httpOptions = {
      headers: headers
    };
    return this.http.get<ICargo>(services.ws_nominas_cargos, httpOptions).pipe(
    )
  }
  save() {

  }

}
