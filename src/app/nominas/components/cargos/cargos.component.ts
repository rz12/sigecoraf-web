import { Component, OnInit, ViewChild } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/cargo';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  public cargosList: Cargo[];
  displayedColumns = ['nombre', 'sueldo', 'seleccionar'];
  dataSource = new MatTableDataSource();
  public urlEdit: String;
  public urlAdd = "cargo-detail/0"
  public message: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private cargoService: CargoService, private seguridadService: SeguridadService) { }
  public pageEvent: PageEvent;
  public length: number;
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  ngOnInit() {
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, this.pageIndex, this.pageSize);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, Number(event.pageIndex) + 1, event.pageSize);
  }
  selectedRow(item, event) {
    this.urlEdit = 'cargo-detail'
    this.urlEdit = this.urlEdit.concat('/').concat(item.id)
  }
  public getCargosPagination(token, pageIndex, pageSize) {
    this.cargoService.cargosList(token.token, pageIndex, pageSize).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.cargosList = data.json().data
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
}
