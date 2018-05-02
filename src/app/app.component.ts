import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SideNavService } from "./shared/services/side-nav.service";
import { UsuarioService } from './seguridad/services/usuario.service';
import { Usuario } from './seguridad/models/usuario';
import { Observable } from 'rxjs/Observable';
import { SeguridadService } from './seguridad/services/seguridad.service';
import { MenuService } from './seguridad/services/menu.service';
import { enums } from './credentials';
import { Router } from '@angular/router';
import { PaginationService } from './shared/services/pagination.service';
import { ParametrizacionService } from './master/services/parametrizacion.service';
import { ConsolidadoRolPagoDetailComponent } from './nominas/components/consolidado-rol-pago-detail/consolidado-rol-pago-detail.component';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  sidenavState: any = false;
  public usuario: Usuario;
  sideNav: Boolean;
  isUsuario$: Observable<Usuario>;
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private seguridadService: SeguridadService, private sidenavService: SideNavService,
    private changeDetector: ChangeDetectorRef, private usuarioService: UsuarioService, private menuService: MenuService, private parametrizacionService: ParametrizacionService) { }

  ngOnInit() {
    this.sidenavState = this.sidenavService.getSideNavState();
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
    this.isUsuario$ = this.usuarioService.isUsuario;
    this.changeDetector.detectChanges();
    let token = this.seguridadService.getToken();
    this.isUsuario$.subscribe(res => {
      if (res) {
        this.usuario = res
      } else {
        if (token != null) {
          this.getUsuarioByToken(token.token);
        }
      }
    })
    let urlCurrent = token ? this.menuService.getMenuActual(token.token) : null;
    let navigate = token ? (urlCurrent ? urlCurrent : "home") : "login";
    this.router.navigate([navigate])
  }
  setSideNavState() {
    this.sideNav = !this.sideNav;
    this.sidenavService.setSideNavState(this.sideNav);
  }
  onLogout() {
    this.seguridadService.logout();
  }
  getUsuarioByToken(token) {
    this.usuarioService.getUsuarioPorToken(token).subscribe(res => {
      this.usuarioService.setUsuario(res.json().data)
      this.usuario = res.json().data;
    });
  }

}
