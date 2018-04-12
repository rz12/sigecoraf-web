import { Component, OnInit, ViewChild } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  public contratoList: Contrato[];
  displayedColumns = ['nombre', 'sueldo', 'seleccionar'];
  dataSource = new MatTableDataSource();
  public urlEdit: String;
  public urlAdd = "contrato-detail/1"
  public message: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private ContratoService: ContratoService, private seguridadService: SeguridadService) { }
  public pageEvent: PageEvent;
  public length: number;
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  ngOnInit() {
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getContratoPagination(token, this.pageIndex, this.pageSize);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getContratoPagination(token, Number(event.pageIndex) + 1, event.pageSize);
  }
  selectedRow(item, event) {
    this.urlEdit = 'cargo-detail'
    this.urlEdit = this.urlEdit.concat('/').concat(item.id)
  }
  public getContratoPagination(token, pageIndex, pageSize) {
    this.ContratoService.contratoList(token.token, pageIndex, pageSize).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.contratoList = data.json().data
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }

}
