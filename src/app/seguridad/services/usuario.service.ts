import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { services, enums } from "../../credentials";
import { Usuario } from '../models/usuario';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UsuarioService {
  private usuario = new BehaviorSubject<Usuario>(null);
  constructor(private http: Http) { }

  getUsuarioPorToken(token) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append("Authorization", token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(services.ws_seguridad_user_by_token, options)
  }

  getUsuario() {
    return this.usuario.asObservable();
  }
  public setUsuario(newValue): void {
    this.usuario.next(newValue);
  }
}