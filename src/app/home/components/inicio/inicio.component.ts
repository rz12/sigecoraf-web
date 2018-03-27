import { Component, OnInit, ViewEncapsulation, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { UsuarioService } from '../../../seguridad/services/usuario.service';
import { Usuario } from '../../../seguridad/models/usuario';
import { Subscription } from 'rxjs';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { enums } from "./../../../credentials";
import { SeguridadService } from './../../../seguridad/services/seguridad.service';

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

  constructor(private usuarioService: UsuarioService, private media: ObservableMedia, private parametrizacionService: ParametrizacionService
    , private seguridadService: SeguridadService) {
    let token = localStorage.getItem(enums.SISTEMA_AUTHKEY);
    this.usuario = new Usuario()
    if (token != null) {
      this.getUsuarioByToken(token);
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
    let data: {}
    this.usuarioService.getUsuarioPorToken(token).subscribe(response => this.usuario = response.json())
  }

}


