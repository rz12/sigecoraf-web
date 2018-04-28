import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ConsolidadoRolPagoService } from '../../services/consolidado-rol-pago.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { ItemService } from '../../../master/services/item.service';
import { enums } from '../../../credentials';
import { SharedService } from '../../../shared/services/shared.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';

@Component({
  selector: 'app-consolidado-rol-pago-list',
  templateUrl: './consolidado-rol-pago-list.component.html',
  styleUrls: ['./consolidado-rol-pago-list.component.css']
})
export class ConsolidadoRolPagoListComponent implements OnInit {

  displayedColumns = ['fecha_desde', 'fecha_hasta', 'observacion', 'validado', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public consolidadoRolPagoSeleccionado: any;
  public urlEdit: String;
  public urlAdd = "consolidado-rolpago-detail/0"
  public codigoAdd = "ADD_CONSOLIDADO_ROLPAGO";
  public codigoEdit = "EDIT_CONSOLIDADO_ROLPAGO";
  public message: String;
  public length: number;
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[]
  public filter: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private consolidadoRolPagoService: ConsolidadoRolPagoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService, private itemService: ItemService,
    private sharedService: SharedService, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) { }
  ngOnInit() {
    this.pageSizeOptions = []
    this.cargarDetallesPaginacion();
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getConsolidadosPagination(token, this.pageIndex, this.pageSize, this.filter);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getConsolidadosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.urlEdit = 'consolidado-rolpago-detail'
      this.urlEdit = this.urlEdit.concat('/').concat(item.id)
      this.selection.toggle(item);
      this.consolidadoRolPagoSeleccionado = item;
    } else {
      this.urlEdit = null;
      this.consolidadoRolPagoSeleccionado = null;
    }
  }
  public getConsolidadosPagination(token, pageIndex, pageSize, filter) {
    this.consolidadoRolPagoService.consolidadoRolPagoList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        let consolidados = data.json().data
        this.dataSource.data = consolidados;
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  public cargarDetallesPaginacion() {
    let parametros = [];

  }
  public search(event) {
    this.filter = event;
    let token = this.seguridadService.getToken()
    this.getConsolidadosPagination(token, this.pageIndex, this.pageSize, this.filter);
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
  public confirmDelete(event) {
    if (this.consolidadoRolPagoSeleccionado) {
      this.dialogService.confirm('Eliminación', '¿Seguro desea Eliminar el Consolidado de Rol de Pago?', this.viewContainerRef)
        .subscribe(res => {
          if (res == true) {
            this.delete(event);
          }
        });
    }
  }
  delete(event) {
    if (event && this.consolidadoRolPagoSeleccionado && !this.consolidadoRolPagoSeleccionado.validado) {
      let token = this.seguridadService.getToken()
      this.consolidadoRolPagoService.delete(token, this.consolidadoRolPagoSeleccionado).subscribe(res => {
        let message = ""
        if (res.status == enums.HTTP_200_OK) {
          message = res.message;
          const index = this.sharedService.getIndexObject(this.dataSource.data, this.consolidadoRolPagoSeleccionado);
          this.dataSource.data.splice(index, 1);
          this.length = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          this.consolidadoRolPagoSeleccionado = null;
          this.urlEdit = null;
        } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
          message = 'Campos Obligatorios Vacíos.'
        }
        this.dialogService.notificacion('', message, this.viewContainerRef)
      })
    }
  }
}
