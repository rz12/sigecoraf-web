import { Component, OnInit, ViewChild } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EmpleadoService } from '../../services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleadosList: Empleado[];
  displayedColumns = ['nombres', 'apellidos', 'fecha_inicio', 'seleccionar'];
  dataSource = new MatTableDataSource();
  public urlEdit: String;
  public urlAdd = "empleado-detail/0"
  public codigoAdd = "ADD_EMPLEADO";
  public codigoEdit = "EDIT_EMPLEADO";
  public message: String;
  public length: number;
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[]
  public filter: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private empleadoService: EmpleadoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService) { }
  ngOnInit() {
    this.pageSizeOptions = []
    this.cargarDetallesPaginacion();
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getEmpleadosPagination(token, this.pageIndex, this.pageSize, this.filter);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getEmpleadosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    this.urlEdit = 'empleado-detail'
    this.urlEdit = this.urlEdit.concat('/').concat(item.id)
  }
  public getEmpleadosPagination(token, pageIndex, pageSize, filter) {
    this.empleadoService.empleadosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.empleadosList = data.json().data
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
    this.getEmpleadosPagination(token, this.pageIndex, this.pageSize, this.filter);
  }

}
