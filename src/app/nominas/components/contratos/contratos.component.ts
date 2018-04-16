import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { enums } from '../../../credentials';
import { SelectionModel } from '@angular/cdk/collections';
import { CargoService } from '../../services/cargo.service';
import { EmpleadoService } from '../../services/empleado.service';
import { DireccionService } from '../../../master/services/direccion.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {

  displayedColumns = ['empleado', 'cargo', 'fecha_inicio', 'fecha_fin', 'estado', 'mensualizar_decimos', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public urlEdit: String;
  public urlAdd = "contrato-detail/0"
  public codigoAdd = "ADD_CONTRATO";
  public codigoEdit = "EDIT_CONTRATO";
  public message: String;
  public contratoSeleccionado: Contrato;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private contratoService: ContratoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService, private cargoService: CargoService, private sharedService: SharedService,
    private viewContainerRef: ViewContainerRef, private dialogService: DialogService, private empleadoService: EmpleadoService) { }
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
    this.getContratosPagination(token, this.pageIndex, this.pageSize, this.filter);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getContratosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.urlEdit = 'contrato-detail';
      this.urlEdit = this.urlEdit.concat('/').concat(item.id);
      this.contratoSeleccionado = item;
      this.selection.toggle(item)
    } else {
      this.urlEdit = null;
    }
  }
  public getContratosPagination(token, pageIndex, pageSize, filter) {
    this.contratoService.contratosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        let contratos = data.json().data
        contratos.forEach(contrato => {
          this.cargoService.getCargo(token, contrato.cargo).subscribe(cargo => {
            contrato.cargoObject = cargo.json().data;
          })
          this.empleadoService.getEmpleado(token, contrato.empleado).subscribe(empleado => {
            contrato.empleadoObject = empleado.json().data;
          })
        });
        this.dataSource.data = contratos;
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
    this.getContratosPagination(token, this.pageIndex, this.pageSize, this.filter);
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
  delete(event) {
    if (event && this.contratoSeleccionado) {
      let token = this.seguridadService.getToken()
      this.contratoService.delete(token, this.contratoSeleccionado).subscribe(res => {
        let message = ""
        if (res.status == enums.HTTP_200_OK) {
          message = res.message;
          const index = this.sharedService.getIndexObject(this.dataSource.data, this.contratoSeleccionado);
          this.dataSource.data.splice(index, 1);
          this.length = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
        } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
          message = 'Campos Obligatorios Vacíos.'
        }
        this.dialogService.notificacion('', message, this.viewContainerRef)
      })
    }
  }
}
