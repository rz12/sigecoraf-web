import { Component, OnInit, ViewChild } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/cargo';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { enums } from '../../../credentials';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';

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
  constructor(private cargoService: CargoService, private seguridadService: SeguridadService, private parametrizacionService: ParametrizacionService) { }
  public length: number;
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[]
  public filter: String;
  ngOnInit() {
    this.pageSizeOptions = []
    this.cargarDetallesPaginacion();
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, this.pageIndex, this.pageSize, this.filter);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    this.urlEdit = 'cargo-detail'
    this.urlEdit = this.urlEdit.concat('/').concat(item.id)
  }
  public getCargosPagination(token, pageIndex, pageSize, filter) {
    this.cargoService.cargosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.cargosList = data.json().data
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  public cargarDetallesPaginacion() {
    let parametros = [];
    if (!this.parametrizacionService.parametros) {
      parametros = this.parametrizacionService.parametros;
    } else {
      parametros = JSON.parse(localStorage.getItem(enums.SISTEMA_PARAM))
    }
    parametros.filter(param => param.codigo == enums.PARAM_SISTEMA_PAGINACION).forEach(res => {
      res.detalles.forEach(detalle => {
        if (detalle.codigo == enums.DETALLE_PAGESIZE) {
          this.pageSize = Number(detalle.valor);
        }
        if (detalle.codigo == enums.DETALLE_PAGESIZE_OPTIONS) {
          detalle.valor.split(",").forEach(element => {
            this.pageSizeOptions.push(Number(element));
          });
        }
      })
    })
  }
  public search(event) {
    this.filter = event;
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, this.pageIndex, this.pageSize, this.filter);
  }
}
