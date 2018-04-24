import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { RolPago } from '../../models/rol-pago';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ConsolidadoRolPago } from '../../models/consolidado-rol-pago';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { SharedService } from '../../../shared/services/shared.service';
import { RolPagoService } from '../../services/rol-pago.service';
import { ItemService } from '../../../master/services/item.service';
import { enums } from '../../../credentials';
import { ContratoService } from '../../services/contrato.service';
import { UsuarioService } from '../../../seguridad/services/usuario.service';
import { EmpleadoService } from '../../services/empleado.service';
import { Contrato } from '../../models/contrato';

@Component({
  selector: 'app-rol-pago-list',
  templateUrl: './rol-pago-list.component.html',
  styleUrls: ['./rol-pago-list.component.css']
})
export class RolPagoListComponent implements OnInit {
  @Input() consolidadoRolPago: ConsolidadoRolPago;
  displayedColumns = ['contrato', 'fecha', 'total', 'seleccionar'];
  selection = new SelectionModel();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  public length: number;
  public pageSize: number = 20;
  public pageIndex: number = 1;
  public pageSizeOptions: number[] = [5, 10, 20]
  public filter: String;
  public message: String;
  public rolPago: RolPago;
  constructor(private dialogService: DialogService, public dialog: MatDialog, private seguridadService: SeguridadService,
    private viewContainerRef: ViewContainerRef, private rolPagoService: RolPagoService, private sharedService: SharedService,
    private empleadoService: EmpleadoService, private contratoService: ContratoService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.rolPago = new RolPago;
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getRolPagination(token, this.pageIndex, this.pageSize, this.filter);

  }
  selectedRow(item, event) {
    if (event.checked) {
      this.rolPago = Object.assign({}, item);
      this.selection.toggle(item);
    } else {
      this.rolPago = new RolPago();
    }
  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getRolPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  public getRolPagination(token, pageIndex, pageSize, filter) {
    this.rolPagoService.rolPagoList(this.consolidadoRolPago.id, token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        let rolesPago = data.json().data;
        rolesPago.forEach(rolPagoEl => {
          this.contratoService.getContrato(token, rolPagoEl.contrato).subscribe(contratoEl => {
            this.empleadoService.getEmpleado(token, contratoEl.json().data.empleado).subscribe(empleado => {
              let contrato = <Contrato>contratoEl.json();
              contrato.empleadoObject = empleado.json().data;
              rolPagoEl.contratoObject = contrato;
            })
          })
        });
        this.dataSource.data = rolesPago;
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  public generarRolesPago() {
    let token = this.seguridadService.getToken();
    this.usuarioService.isUsuario.subscribe(res => {
      this.rolPagoService.create_by_consolidado_rolpago(this.consolidadoRolPago.id, res.empresa.id, token).subscribe(data => {
        data.data.forEach(rol => {
          this.contratoService.getContrato(token, rol.contrato).subscribe(contratoEl => {
            this.empleadoService.getEmpleado(token, contratoEl.json().data.empleado).subscribe(empleado => {
              let contrato = <Contrato>contratoEl.json();
              contrato.empleadoObject = empleado.json().data;
              rol.contratoObject = contrato;
              this.dataSource.data.push(rol)
            })
          })
        });
        this.length = data.count;
      })
    });

  }
  public confirmGenerarRolesPago() {
    this.dialogService.confirm('Generar Rol de Pago', '¿Seguro desea generar Roles de Pago?', this.viewContainerRef)
      .subscribe(res => {
        if (res == true) {
          this.generarRolesPago();
        }
      });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
  }
}
