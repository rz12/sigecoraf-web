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
    , private seguridadService: SeguridadService, private idle: Idle, private keepalive: Keepalive) {

    let token = localStorage.getItem(enums.SISTEMA_AUTHKEY);

    this.usuario = new Usuario()
    if (this.seguridadService.isLoggedIn) {
      this.getUsuarioByToken(token);
      this.cargarParametros(token)
    }

    this.watcher = media.subscribe((change: MediaChange) => {
      let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
      this.isOpen = !isMobile;
      if (isMobile) {
        this.mode = 'over';
        this.estilo = ''
      } else {
        this.mode = 'side';
        this.estilo = 'width-20 sidebar-left';
      }
    });
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


