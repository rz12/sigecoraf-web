import { Component, OnInit } from '@angular/core';
import { RolPagoService } from '../../services/rol-pago.service';
import { RolPago } from '../../models/rol-pago';
import { MatTableDataSource } from '@angular/material';
import { Subscriber } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';


@Component({
  selector: 'app-RolesPago',
  templateUrl: './roles-pago.component.html',
  styleUrls: ['./roles-pago.component.css']
})

export class RolesPagoComponent implements OnInit {
  public RolPagoList: RolPago []
  displayedColumns = ['nombre, apellido, sueldo']
  DataSource = new MatTableDataSource();
  public urlEdit = "rol-pago-detail/0"
  public urlAdd = "rol-pago-detail/0"
  public mensaje = 'bienvenido a roles de pago'

  constructor(private RolPagoService: RolPagoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    let token = this.seguridadService.getToken()
    this.RolPagoService.rolPagoList(token.token).subscribe(data => this.DataSource.data= this.RolPagoList= data.data);
  }
}
