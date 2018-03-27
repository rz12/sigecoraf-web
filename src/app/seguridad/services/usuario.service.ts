import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services } from "../../credentials";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';
import { enums } from "../../credentials";
@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  autenticate(usercreds) {
    return new Promise((resolve) => {
      let credenciales = 'username=' + usercreds.username + '&password=' + usercreds.password;
      let headers = new Headers();
      headers.append('Content-Type', 'application/X-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });
      this.http.post(services.ws_seguridad_login, credenciales, options).subscribe((data) => {
        if (data.json()) {
          window.localStorage.setItem(enums.SISTEMA_AUTHKEY, data.json().token);
          resolve(true)
        }
      }, (err) => resolve(false)
      )
    });
  }
  getUsuarioPorToken(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_seguridad_user_by_token, options)
  }
}