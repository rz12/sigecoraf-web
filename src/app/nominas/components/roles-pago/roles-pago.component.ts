import { Component, OnInit } from '@angular/core';
import { RolPagoService } from '../../services/rol-pago.service';
import { RolPago } from '../../models/rol-pago';
import { MatTableDataSource } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-roles-pago',
  templateUrl: './roles-pago.component.html',
  styleUrls: ['./roles-pago.component.css']
})
export class RolesPagoComponent implements OnInit {
  public rolPagoList: RolPago[]
  displayedColumns = ['fecha_inicio, total'];
  dataSource = new MatTableDataSource();
  public urlEdit = 'rol-pago-detail/0'
  public urlAdd = 'rol-pago-detail/0'
  public message = String;
  constructor(private RolPagoService: RolPagoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    let token = this.seguridadService.getToken()
    this.RolPagoService.rolPagoList(token.token).subscribe(data => {
      
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.rolPagoList = data.json().data
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
}
