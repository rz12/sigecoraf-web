import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { enums } from '../../../credentials';
import { SelectionModel } from '@angular/cdk/collections';
import { DireccionService } from '../../../master/services/direccion.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { SharedService } from '../../../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../shared/services/pagination.service';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private route: ActivatedRoute, private contratoService: ContratoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService, private sharedService: SharedService, private paginationService: PaginationService,
    private viewContainerRef: ViewContainerRef, private dialogService: DialogService) { }
  public length: number;
  public filter: String;
  ngOnInit() {
    this.route.data.subscribe(res => {
      this.dataSource.data = res.data.json().data
      this.length = res.data.json().count
    })

  }

  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getContratosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item) {
    this.selection.toggle(item);
    if (this.selection.selected.length > 0) {
      this.urlEdit = 'contrato-detail';
      this.urlEdit = this.urlEdit.concat('/').concat(item.id);
    } else {
      this.urlEdit = null;
    }
  }
  public getContratosPagination(token, pageIndex, pageSize, filter) {
    this.contratoService.contratosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
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
    this.getContratosPagination(token, 1, this.paginationService.pageSize, this.filter);
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
    let contrato = this.selection.selected.length > 0 ? <Contrato>this.selection.selected[0] : null;
    if (event && contrato) {
      let token = this.seguridadService.getToken()
      this.contratoService.delete(token, contrato).subscribe(res => {
        let message = ""
        if (res.status == enums.HTTP_200_OK) {
          message = res.message;
          const index = this.sharedService.getIndexObject(this.dataSource.data, contrato);
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

  public confirmDelete(event) {
    if (this.selection.selected.length > 0) {
      this.dialogService.confirm('Eliminación', '¿Seguro desea Eliminar el Contrato?', this.viewContainerRef)
        .subscribe(res => {
          if (res == true) {
            this.delete(event);
          }
        });
    }
  }
}
