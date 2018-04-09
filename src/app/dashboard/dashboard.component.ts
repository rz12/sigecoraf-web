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
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  sideNav: Boolean;
  some = false

  constructor(private router: Router, private seguridadService: SeguridadService, private menuService: MenuService,
    private usuarioService: UsuarioService, private sidenavService: SideNavService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
    if (!localStorage.getItem(enums.SISTEMA_MENUS)) {
      this.cargarMenus(token);
    } else {
      this.menuService.setMenus(JSON.parse(localStorage.getItem(enums.SISTEMA_MENUS)));
    }

    if (this.isLoggedIn$.subscribe(res => res == false)) {
      var token = this.seguridadService.getToken()
      if (token == null) {
        token = localStorage.getItem(enums.SISTEMA_AUTHKEY);
      }
      if (token != null) {
        this.seguridadService.setLoggedIn(true);

      }

    }
  }
  public navigate(menu) {
    this.updateActivateMenus(menu)
    let link = ['/' + menu.formulario];
    this.router.navigate(link);
  }
  public updateActivateMenus(menuEdit) {
    this.menuService.getMenus().forEach(menu => {
      if (menu == menuEdit) {
        menu.activate = true;
      } else {
        menu.activate = false
      }
    });
    localStorage.setItem(enums.SISTEMA_MENUS, JSON.stringify(this.menuService.getMenus()))
  }
  onLogout() {
    this.seguridadService.logout();
  }
  public cargarMenus(token) {
    this.menuService.cargarMenus(token);

  }
  setSideNavState() {
    this.sideNav = !this.sideNav;
    this.sidenavService.setSideNavState(this.sideNav);
  }
}
