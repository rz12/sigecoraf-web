import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { enums } from "./credentials";
import { SideNavService } from "./shared/services/side-nav.service";

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
    var token = localStorage.getItem(enums.SISTEMA_AUTHKEY)
    if (token != null) {
      this.router.navigate(['home'])
    } else {
      this.router.navigate(['login'])
    }
  }

  ngOnInit() {
    this.sidenavState = this.sidenavService.getSideNavState();
  }
}
