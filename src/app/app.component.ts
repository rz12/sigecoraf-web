import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { enums } from "./credentials";
import { SeguridadService } from './seguridad/services/seguridad.service';


declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, private seguridadService: SeguridadService) {
    var token = localStorage.getItem(enums.SISTEMA_AUTHKEY);
    if (token != null) {
      this.router.navigate(['home'])
    } else {
      this.router.navigate(['login'])
    }
  }
}
