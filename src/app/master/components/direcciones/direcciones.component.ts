import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Empleado } from "../../../nominas/models/empleado";
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { DireccionService } from '../../services/direccion.service';
import { enums } from '../../../credentials';
import { DireccionDetailDialogComponent } from '../direccion-detail-dialog/direccion-detail-dialog.component';
import { Direccion } from '../../models/direccion';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { SharedService } from '../../../shared/services/shared.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemService } from '../../services/item.service';
@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {
  @Input() empleado: Empleado;
  displayedColumns = ['pais', 'ciudad', 'calle_principal', 'referencia', 'tipo_direccion', 'telefono', 'seleccionar'];
  selection = new SelectionModel();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  public length: number;
  public pageSize: number = 20;
  public pageIndex: number = 1;
  public pageSizeOptions: number[] = [5, 10, 20]
  public filter: String;
  public message: String;
  public direccion: Direccion;
  constructor(private dialogService: DialogService, public dialog: MatDialog, private seguridadService: SeguridadService,
    private viewContainerRef: ViewContainerRef, private direccionService: DireccionService, private sharedService: SharedService,
    private itemService: ItemService) { }

  ngOnInit() {
    this.direccion = new Direccion();
  }
  ngAfterViewInit() {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, this.pageIndex, this.pageSize, this.filter);

  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.direccion = Object.assign({}, item);
      this.selection.toggle(item);
    } else {
      this.direccion = new Direccion();
    }
  }
  public getCargosPagination(token, pageIndex, pageSize, filter) {
    this.direccionService.direccionesLisByPersona(this.empleado.id, token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        let direcciones = data.json().data;
        direcciones.forEach(element => {
          this.itemService.getItem(token, element.pais).subscribe(res => {
            element.itemPais = res.json().data;
          })
          this.itemService.getItem(token, element.tipo_direccion).subscribe(res => {
            element.itemTipoDireccion = res.json().data;

          })
        });
        this.dataSource.data = direcciones;
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }
  openDialog() {
    let token = this.seguridadService.getToken();
    const dialogRef = this.dialog.open(DireccionDetailDialogComponent, {
      width: '500px',
      data: { direccion: this.direccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.persona = this.empleado.id
        let response = this.direccionService.save(token, result);
        response.subscribe(res => {
          let message = ""
          if (res.status == enums.HTTP_200_OK) {
            message = res.message;
            this.itemService.getItem(token, res.data.pais).subscribe(item => {
              res.data.itemPais = item.json().data;
            })
            this.itemService.getItem(token, res.data.tipo_direccion).subscribe(item => {
              res.data.itemTipoDireccion = item.json().data;
            })
            const index = this.sharedService.getIndexObject(this.dataSource.data, res.data);
            if (index == -1) {
              this.dataSource.data.push(res.data)
            } else {
              this.dataSource.data.splice(index, 1);
              this.dataSource.data.push(res.data)
            }
            this.length = this.dataSource.data.length;
            this.dataSource.paginator = this.paginator;
            this.direccion = new Direccion();
          } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
            message = 'Campos Obligatorios Vacíos.'
          }
          this.dialogService.notificacion('', message, this.viewContainerRef)
        })
      }
    });
  }
  delete() {
    if (this.direccion.id) {
      let token = this.seguridadService.getToken()
      this.direccionService.delete(token, this.direccion).subscribe(res => {
        let message = ""
        if (res.status == enums.HTTP_200_OK) {
          message = res.message;
          const index = this.sharedService.getIndexObject(this.dataSource.data, this.direccion);
          this.dataSource.data.splice(index, 1);
          this.length = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          this.direccion = new Direccion();
        } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
          message = 'Campos Obligatorios Vacíos.'
        }
        this.dialogService.notificacion('', message, this.viewContainerRef)
      })
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
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
  }
}
