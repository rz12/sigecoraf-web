import { Component, OnInit, ViewChild } from '@angular/core';
import { enums } from '../credentials';
import { SeguridadService } from '../seguridad/services/seguridad.service';
import { Menu } from "../seguridad/models/menu";
import { MenuService } from "../seguridad/services/menu.service";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  public menus: Menu[]
  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(private seguridadService: SeguridadService, private menuService: MenuService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
    if (this.isLoggedIn$.subscribe(res => res == false)) {
      var token = localStorage.getItem(enums.SISTEMA_AUTHKEY);
      if (token != null) {
        this.seguridadService.setLoggedIn(true);
        this.cargarMenus(token);
      }
    }
  }
  onLogout() {
    this.seguridadService.logout();
  }
  public cargarMenus(token) {
    this.menuService.getMenus(token).subscribe(res => this.menus = res.data)
  }
}
