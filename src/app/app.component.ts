import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ParametrizacionService } from "../app/master/services/parametrizacion.service";
import { Parametrizacion } from './master/models/parametrizacion';
import { enums } from "./credentials";
import { SeguridadService } from './seguridad/services/seguridad.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive,
    private parametrizacionService: ParametrizacionService, private seguridadService: SeguridadService) {
    var token = localStorage.getItem(enums.SISTEMA_AUTHKEY);
    this.cargarParametros(token)
    this.seguridadService.setParametros(JSON.parse(localStorage.getItem(enums.SISTEMA_PARAM)))
    this.seguridadService.sessionTimeout();
    if (token != null) {
      this.router.navigate(['home'])
    } else {
      this.router.navigate(['login'])
    }
  }

  public cargarParametros(token) {
    this.parametrizacionService.getParametrizaciones(token).subscribe(
      res => localStorage.setItem(enums.SISTEMA_PARAM, JSON.stringify(res.json().data)));
  }
  reset() {
    this.idle.watch();
  }
}
