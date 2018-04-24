import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Parametrizacion } from "../../master/models/parametrizacion";
import { enums } from "./../../credentials";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions, Http } from '@angular/http';
import { services } from "../../credentials";
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from './usuario.service';

@Injectable()
export class SeguridadService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: any;
  public lastPing?: Date = null;
  constructor(private http: Http, private router: Router, private usuarioService: UsuarioService, private idle: Idle, private keepalive: Keepalive) { }


  autenticate(usercreds) {
    return new Promise((resolve) => {
      let credenciales = 'username=' + usercreds.username + '&password=' + usercreds.password;
      let headers = new Headers();
      headers.append('Content-Type', 'application/X-www-form-urlencoded');
      let options = new RequestOptions({ headers: headers });
      this.http.post(services.ws_seguridad_login, credenciales, options).subscribe((data) => {
        if (data.json()) {
          this.token = data.json();
          localStorage.setItem(enums.SISTEMA_AUTHKEY, JSON.stringify(this.token))
          resolve(true)
          this.usuarioService.getUsuarioPorToken(this.token.token).subscribe(usuario => {
            this.usuarioService.setUsuario(usuario.json().data)
          });
          this.loggedIn.next(true);
        }
      }, (err) => resolve(false)
      )
    });
  }
  public sessionTimeout(parametros: any[]) {
    if (parametros != null) {
      parametros.forEach(param => {
        param.detalles.forEach(detalle => {
          if (detalle.codigo == enums.SISTEMA_DETALLE_PARAM_TIMEOUT) {
            this.idle.setIdle(Number(detalle.valor));
            this.idle.setTimeout(Number(detalle.valor));
          }
          if (detalle.codigo == enums.SISTEMA_DETALLE_PARAM_TIMEOUT) {
            this.keepalive.interval(detalle.valor);
          }
        });
      });
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      this.idle.onTimeout.subscribe(() => {
        this.token = null;
        localStorage.clear()
        this.loggedIn.next(false);
        this.router.navigate(['login'])
      });
      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
      this.reset();
    }
  }
  public logout() {
    this.loggedIn.next(false);
    this.token = null;
    localStorage.clear()
    this.router.navigate(['login'])

  }
  reset() {
    this.idle.watch();
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  public setLoggedIn(newValue: boolean): void {
    this.loggedIn.next(newValue);
  }
  getToken() {
    if (this.token == null) {
      this.token = JSON.parse(localStorage.getItem(enums.SISTEMA_AUTHKEY))
    }
    return this.token;
  }
}
