import { Component, OnInit } from '@angular/core';
import { enums } from '../credentials';
import { SeguridadService } from '../seguridad/services/seguridad.service';
import { Menu } from "../seguridad/models/menu";
import { MenuService } from "../seguridad/services/menu.service";
import { Observable } from 'rxjs/Observable';
import { SideNavService } from '../shared/services/side-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private seguridadService: SeguridadService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
    let menus = JSON.parse(localStorage.getItem(enums.SISTEMA_MENUS));
    if (menus) {
      this.menuService.setMenus(menus);
    }
    if (this.isLoggedIn$.subscribe(res => res == false)) {
      let token = this.seguridadService.getToken()
      if (token != null) {
        this.seguridadService.setLoggedIn(true);
      }
    }
  }
  public navigate(menu) {
    this.menuService.updateActivateMenus(menu, null)
    let link = ['/' + menu.formulario];
    this.router.navigate(link);
  }
}
