import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services } from "../../credentials";
@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  getUsuarioPorToken(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_seguridad_user_by_token, options)
  }
}