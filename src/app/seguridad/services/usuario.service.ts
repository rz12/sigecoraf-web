import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services, enums } from "../../credentials";
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
  private usuario: Usuario;
  constructor(private http: Http) { }

  getUsuarioPorToken(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_seguridad_user_by_token, options).subscribe(res => {
      this.usuario = res.json();
      localStorage.setItem(enums.SESSION_USUARIO, JSON.stringify(this.usuario));
    })
  }
  public getUsuario() {

    if (this.usuario) {
      return this.usuario;
    }

    return JSON.parse(localStorage.getItem(enums.SESSION_USUARIO));
  }
}