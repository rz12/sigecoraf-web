import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ConsolidadoRolPagoService } from '../../services/consolidado-rol-pago.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { ItemService } from '../../../master/services/item.service';
import { enums } from '../../../credentials';

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
  public pageSize: number = 1;
  public pageIndex: number = 1;
  public pageSizeOptions: number[]
  public filter: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private consolidadoRolPagoService: ConsolidadoRolPagoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService, private itemService: ItemService) { }
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

}
