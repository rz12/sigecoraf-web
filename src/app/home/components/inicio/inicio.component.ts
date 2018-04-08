import { Component, OnInit, ViewEncapsulation, ViewChild, NgZone, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { UsuarioService } from '../../../seguridad/services/usuario.service';
import { Usuario } from '../../../seguridad/models/usuario';
import { Subscription } from 'rxjs';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { enums } from "./../../../credentials";
import { SeguridadService } from './../../../seguridad/services/seguridad.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MenuService } from '../../../seguridad/services/menu.service';


declare const $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InicioComponent {

  private isOpen = true;
  private usuario: Usuario;
  mode = 'side';
  private watcher: Subscription;
  estilo = 'width-20 sidebar-left';

  constructor(private router: Router, private usuarioService: UsuarioService, private media: ObservableMedia, private parametrizacionService: ParametrizacionService
    , private seguridadService: SeguridadService, private menuService: MenuService, private idle: Idle, private keepalive: Keepalive) {

    let token = this.seguridadService.getToken()
    this.usuario = new Usuario()
    if (menuService.getMenus()) {
      menuService.getMenus().forEach(menu => {
        if (Number(menu.orden) == 1) {
          menu.activate = true
        } else {
          menu.activate = false;
        }
      })

    }
    if (this.seguridadService.isLoggedIn) {
      this.getUsuarioByToken(token.token);
      this.cargarParametros(token.token)
    }
  }

  getUsuarioByToken(token) {
    this.usuarioService.getUsuarioPorToken(token)
  }
  public cargarParametros(token) {
    this.parametrizacionService.getParametrizaciones(token).subscribe(
      res => this.seguridadService.sessionTimeout(res.data));
  }
  reset() {
    this.idle.watch();
  }

}


