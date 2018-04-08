import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { enums } from "./credentials";
import { SideNavService } from "./shared/services/side-nav.service";
import { Menu } from './seguridad/models/menu';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  sidenavState: any = false;
  constructor(private router: Router, private sidenavService: SideNavService) {
    this.navigate();
  }

  ngOnInit() {
    this.sidenavState = this.sidenavService.getSideNavState();
  }
  public navigate() {
    var token = localStorage.getItem(enums.SISTEMA_AUTHKEY)
    let menus = JSON.parse(localStorage.getItem(enums.SISTEMA_MENUS))
    let urlCurrent = null
    if (menus) {
      menus.forEach(element => {
        if (element.activate) {
          urlCurrent = element.formulario;
        }
      });
    }
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
}
