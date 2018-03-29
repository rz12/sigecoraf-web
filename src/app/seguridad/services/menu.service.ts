import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { services } from "../../credentials";
import { IMenu } from '../dto/i-menu';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenus(token): Observable<IMenu> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let httpOptions = {
      headers: headers
    };
    return this.http.get<IMenu>(services.ws_seguridad_menus, httpOptions)

  }
}
