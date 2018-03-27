import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Parametrizacion } from "../../master/models/parametrizacion";
import { enums } from "./../../credentials";
import { Router } from "@angular/router";
@Injectable()
export class SeguridadService {
  public lastPing?: Date = null;
  public parametros: any
  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive) { }
  public setParametros(parametros: Parametrizacion[]) {
    this.parametros = parametros
  }
  public sessionTimeout() {
    this.parametros.forEach(param => {
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
      this.router.navigate(['login'])
      localStorage.clear()
    });
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.reset();
  }
  reset() {
    this.idle.watch();
  }
}
