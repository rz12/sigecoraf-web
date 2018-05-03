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
import { PaginationService } from '../../../shared/services/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { ConsolidadoRolPago } from '../../models/consolidado-rol-pago';

@Component({
  selector: 'app-consolidado-rol-pago-list',
  templateUrl: './consolidado-rol-pago-list.component.html',
  styleUrls: ['./consolidado-rol-pago-list.component.css']
})
export class ConsolidadoRolPagoListComponent implements OnInit {

  displayedColumns = ['fecha_desde', 'fecha_hasta', 'observacion', 'validado', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public urlEdit: String;
  public urlAdd = "consolidado-rolpago-detail/0"
  public codigoAdd = "ADD_CONSOLIDADO_ROLPAGO";
  public codigoEdit = "EDIT_CONSOLIDADO_ROLPAGO";
  public message: String;
  public length: number;
  public filter: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private consolidadoRolPagoService: ConsolidadoRolPagoService, private seguridadService: SeguridadService,
    private paginationService: PaginationService, private itemService: ItemService, private route: ActivatedRoute,
    private sharedService: SharedService, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) { }
  ngOnInit() {
    this.route.data.subscribe(res => {
      this.dataSource.data = res.data.json().data
      this.length = res.data.json().count
    })
  }

  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getConsolidadosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item) {
    this.selection.toggle(item);
    if (this.selection.selected.length > 0) {
      this.urlEdit = 'consolidado-rolpago-detail'
      this.urlEdit = this.urlEdit.concat('/').concat(item.id)
    } else {
      this.urlEdit = null;
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
    this.getConsolidadosPagination(token, 1, this.paginationService.pageSize, this.filter);
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
    if (this.selection.selected.length > 0) {
      this.dialogService.confirm('Eliminación', '¿Seguro desea Eliminar el Consolidado de Rol de Pago?', this.viewContainerRef)
        .subscribe(res => {
          if (res == true) {
            this.delete(event);
          }
        });
    }
  }
  delete(event) {
    let consolidado = this.selection.selected.length > 0 ? <ConsolidadoRolPago>this.selection.selected[0] : null;
    if (event && consolidado && !consolidado.validado) {
      let token = this.seguridadService.getToken()
      this.consolidadoRolPagoService.delete(token, consolidado).subscribe(res => {
        let message = ""
        if (res.status == enums.HTTP_200_OK) {
          message = res.message;
          const index = this.sharedService.getIndexObject(this.dataSource.data, consolidado);
          this.dataSource.data.splice(index, 1);
          this.length = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          this.urlEdit = null;
        } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
          message = 'Campos Obligatorios Vacíos.'
        }
        this.dialogService.notificacion('', message, this.viewContainerRef)
      })
    }
  }
}
