import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Parametrizacion } from "../../master/models/parametrizacion";
import { enums } from "./../../credentials";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions, Http } from '@angular/http';
import { services } from "../../credentials";

@Injectable()
export class SeguridadService {
  public lastPing?: Date = null;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: Http, private router: Router, private idle: Idle, private keepalive: Keepalive) { }


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
    localStorage.clear()
    this.router.navigate(['login'])

  }
  reset() {
    this.idle.watch();
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  } T
  public setLoggedIn(newValue: boolean): void {
    this.loggedIn.next(newValue);
  }
}
