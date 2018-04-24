import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from "@angular/flex-layout";
import { UsuarioService } from '../../../seguridad/services/usuario.service';
import { Usuario } from '../../../seguridad/models/usuario';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { enums } from "./../../../credentials";
import { SeguridadService } from './../../../seguridad/services/seguridad.service';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Observable } from 'rxjs/Observable';
import { Keepalive } from '@ng-idle/keepalive';
import { MenuService } from '../../../seguridad/services/menu.service';


declare const $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],

})
export class InicioComponent {

  isUsuario$: Observable<Usuario>;
  usuario: Usuario;

  constructor(private router: Router, private media: ObservableMedia, private parametrizacionService: ParametrizacionService
    , private seguridadService: SeguridadService, private menuService: MenuService, private idle: Idle, private keepalive: Keepalive,
    private usuarioService: UsuarioService) {

    let token = this.seguridadService.getToken();
    let urlCurrent = menuService.getMenuActual(token);
    this.isUsuario$ = this.usuarioService.isUsuario;
    this.isUsuario$.subscribe(res => {
      if (res) {
        this.usuario = res;
      }
    })
    let parametros = JSON.parse(localStorage.getItem(enums.SISTEMA_PARAM))
    if (!parametros) {
      this.getParametros(token.token)
    }
    let navigate = token ? (urlCurrent ? urlCurrent : "home") : "login";
    this.router.navigate([navigate])
  }


  public getParametros(token) {
    this.parametrizacionService.getParametrizaciones(token).subscribe(
      res => {
        this.parametrizacionService.parametros = res.data;
        this.seguridadService.sessionTimeout(this.parametrizacionService.parametros)
        localStorage.setItem(enums.SISTEMA_PARAM, JSON.stringify(this.parametrizacionService.parametros));
      });
  }
  reset() {
    this.idle.watch();
  }
  public getMenus(token) {
    this.menuService.cargarMenus(token);
  }

}


