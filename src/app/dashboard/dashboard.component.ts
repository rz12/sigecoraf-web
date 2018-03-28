import { Component, OnInit } from '@angular/core';
import { enums } from '../credentials';
import { SeguridadService } from '../seguridad/services/seguridad.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  constructor(private seguridadService: SeguridadService) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.seguridadService.isLoggedIn;
  }
  onLogout() {
    this.seguridadService.logout();
  }
}
