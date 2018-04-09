import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';
import { MatTableDataSource } from '@angular/material';
import { Subscriber } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  public contratoList: Contrato[]
  displayedColumns = [ 'empleado', 'sueldo']
  DataSource = new MatTableDataSource();
  public urlEdit = "contrato-detail/0"
  public urlAdd = "contrato-detail/0"
  public mensaje = 'mi primer proyecto'

  constructor(private contratoService: ContratoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    let token = this.seguridadService.getToken()
    this.contratoService.contratosList(token.token).subscribe(data => this.DataSource.data= this.contratoList= data.data);
  }

}
