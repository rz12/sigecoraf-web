import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { enums } from "./credentials";
import { SideNavService } from "./shared/services/side-nav.service";
import { Menu } from './seguridad/models/menu';
import { UsuarioService } from './seguridad/services/usuario.service';
import { Usuario } from './seguridad/models/usuario';
import { Observable } from 'rxjs/Observable';
import { SeguridadService } from './seguridad/services/seguridad.service';
import { MenuService } from './seguridad/services/menu.service';

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
  public isLoggedIn: Boolean;
  constructor(private router: Router, private seguridadService: SeguridadService, private sidenavService: SideNavService,
    private changeDetector: ChangeDetectorRef, private usuarioService: UsuarioService, private menuService: MenuService) {

  }

  ngOnInit() {
    this.sidenavState = this.sidenavService.getSideNavState();
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
    this.changeDetector.detectChanges();
    let token = this.seguridadService.getToken();
    let menus = this.menuService.getMenus();
    let urlCurrent = null

    this.usuarioService.getUsuario().subscribe(res => {
      if (res) {
        this.usuario = res
      } else {
        if (token != null) {
          this.getUsuarioByToken(token.token);
        }
      }
    })
    if (menus) {
      menus.forEach(element => {
        if (element.activate) {
          urlCurrent = element.formulario;
        }
      });
    }
    this.navigate(token, urlCurrent);
  }
  public navigate(token, urlCurrent) {
    if (token != null) {
      if (urlCurrent == null) {
        this.router.navigate(['home'])
      } else {
        this.router.navigate([urlCurrent])
      }
    } else {
      this.router.navigate(['login'])
    }
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
