import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { enums } from '../credentials';
import { SeguridadService } from '../seguridad/services/seguridad.service';
import { Menu } from "../seguridad/models/menu";
import { MenuService } from "../seguridad/services/menu.service";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { SideNavService } from '../shared/services/side-nav.service';
import { UsuarioService } from '../seguridad/services/usuario.service';
import { Usuario } from '../seguridad/models/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  public menus: Menu[]
  sideNav: Boolean;
  usuario: Usuario
  constructor(private seguridadService: SeguridadService, private menuService: MenuService,
    private usuarioService: UsuarioService, private sidenavService: SideNavService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
    this.cargarMenus(token);

    if (this.isLoggedIn$.subscribe(res => res == false)) {
      var token = localStorage.getItem(enums.SISTEMA_AUTHKEY);
      if (token != null) {
        this.seguridadService.setLoggedIn(true);

      }
    }
  }

  onLogout() {
    this.seguridadService.logout();
  }
  public cargarMenus(token) {
    this.menuService.getMenus(token).subscribe(res => this.menus = res.data)
  }
  setSideNavState() {
    this.sideNav = !this.sideNav;
    this.sidenavService.setSideNavState(this.sideNav);
  }
}
