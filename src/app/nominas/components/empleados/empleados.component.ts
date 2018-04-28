import { Component, OnInit, ViewChild } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { EmpleadoService } from '../../services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { enums } from '../../../credentials';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemService } from '../../../master/services/item.service';
import { PaginationService } from '../../../shared/services/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  displayedColumns = ['nombres', 'apellidos', 'numero_identificacion', 'tipo_documento', 'celular', 'fecha_inicio', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public urlEdit: String;
  public urlAdd = "empleado-detail/0"
  public codigoAdd = "ADD_EMPLEADO";
  public codigoEdit = "EDIT_EMPLEADO";
  public message: String;
  public length: number;
  public filter: String;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private empleadoService: EmpleadoService, private seguridadService: SeguridadService, private paginationService: PaginationService,
    private parametrizacionService: ParametrizacionService, private itemService: ItemService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(res => {
      this.dataSource.data = res.data.json().data
      this.length = res.data.json().count
    })
  }

  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getEmpleadosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.urlEdit = 'empleado-detail'
      this.urlEdit = this.urlEdit.concat('/').concat(item.id)
      this.selection.toggle(item);
    } else {
      this.urlEdit = null;
    }
  }
  public getEmpleadosPagination(token, pageIndex, pageSize, filter) {
    this.empleadoService.empleadosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = data.json().data;
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }

  public search(event) {
    this.filter = event;
    let token = this.seguridadService.getToken()
    this.getEmpleadosPagination(token, 1, this.paginationService.pageSize, this.filter);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
