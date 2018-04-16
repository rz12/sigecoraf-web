import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { EmpleadoService } from '../../services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { enums } from '../../../credentials';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-empleados-autocomplete',
  templateUrl: './empleados-autocomplete.component.html',
  styleUrls: ['./empleados-autocomplete.component.css']
})
export class EmpleadosAutocompleteComponent implements OnInit {
  @Output() notificador = new EventEmitter();
  public empleadoSeleccionado: Empleado;
  displayedColumns = ['nombres', 'apellidos', 'numero_identificacion', 'tipo_documento', 'celular', 'fecha_inicio', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public urlEdit: String;
  public urlAdd = "empleado-detail/0"
  public codigoAdd = "ADD_EMPLEADO";
  public codigoEdit = "EDIT_EMPLEADO";
  public message: String;
  public length: number;
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[]
  @Input() filter: String;
  public visible: Boolean = false;
  @Input() control: Form;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private empleadoService: EmpleadoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService) { }
  ngOnInit() {
    this.pageSizeOptions = []
    this.cargarDetallesPaginacion();
  }

  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getEmpleadosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.empleadoSeleccionado = item
      this.notificador.emit(this.empleadoSeleccionado)
      this.selection.toggle(item);
      this.visible = false;
      this.filter = this.empleadoSeleccionado.primer_nombre.concat(" " + this.empleadoSeleccionado.segundo_nombre).
        concat(" " + this.empleadoSeleccionado.segundo_nombre)
        .concat(" " + this.empleadoSeleccionado.primer_apellido).concat(" " + this.empleadoSeleccionado.segundo_apellido);
    } else {
      this.empleadoSeleccionado = new Empleado();
      this.visible = true;
    }
  }
  public getEmpleadosPagination(token, pageIndex, pageSize, filter) {
    this.empleadoService.empleadosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = data.json().data
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
  public search() {
    if (this.filter != '') {
      this.visible = true;
      let token = this.seguridadService.getToken()
      this.getEmpleadosPagination(token, this.pageIndex, this.pageSize, this.filter);
    } else {
      this.visible = false;
    }
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
