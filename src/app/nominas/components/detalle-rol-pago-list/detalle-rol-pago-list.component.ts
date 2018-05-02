import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { RolPago } from '../../models/rol-pago';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { DetalleRolPagoService } from '../../services/detalle-rol-pago.service';
import { enums } from '../../../credentials';
import { PaginationService } from '../../../shared/services/pagination.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { UsuarioService } from '../../../seguridad/services/usuario.service';

@Component({
  selector: 'app-detalle-rol-pago-list',
  templateUrl: './detalle-rol-pago-list.component.html',
  styleUrls: ['./detalle-rol-pago-list.component.css']
})
export class DetalleRolPagoListComponent implements OnInit {
  @Input() rolPago: RolPago;
  displayedColumns = ['detalle', 'cantidad', 'valor'];
  selection = new SelectionModel();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  public length: number;
  public filter: String;
  constructor(private seguridadService: SeguridadService, private detalleRolPagoService: DetalleRolPagoService, private paginationService: PaginationService,
    private dialogService: DialogService, private viewContainerRef: ViewContainerRef, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getDetalleRolPagoPagination(this.seguridadService.getToken(), 1, this.paginationService.pageSize, this.filter);
  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getDetalleRolPagoPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  public getDetalleRolPagoPagination(token, pageIndex, pageSize, filter) {

    this.detalleRolPagoService.detalleRolPagoByRolPagoList(this.rolPago.id, token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = data.json().data;
        this.length = data.json().count;
      }
    });
  }
  confirmGenerarDetalleRolPago() {
    this.dialogService.confirm('Generar Detalles de Rol de Pago', '¿Seguro desea generar los Detalles de Rol de Pago?', this.viewContainerRef)
      .subscribe(res => {
        if (res == true) {
          this.generarDetallesRolPago()
        }
      });
  }
  generarDetallesRolPago() {
    let token = this.seguridadService.getToken();
    this.usuarioService.isUsuario.subscribe(res => {
      this.detalleRolPagoService.createByRolPago(this.rolPago.id, res.empresa.id, token).subscribe(res => {
        res.data.forEach(rolPagoResponse => {
          this.dataSource.data.push(rolPagoResponse)
        });
        this.length = res.count;
        this.dataSource.paginator = this.paginator;
      })
    });
  }
}
