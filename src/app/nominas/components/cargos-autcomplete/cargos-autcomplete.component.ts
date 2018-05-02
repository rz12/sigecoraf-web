import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Form } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Cargo } from "../../models/cargo";
import { CargoService } from '../../services/cargo.service';
import { map } from 'rxjs/operators/map';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { enums } from '../../../credentials';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginationService } from '../../../shared/services/pagination.service';
@Component({
  selector: 'app-cargos-autcomplete',
  templateUrl: './cargos-autcomplete.component.html',
  styleUrls: ['./cargos-autcomplete.component.css']
})
export class CargosAutcompleteComponent implements OnInit {
  @Output() notificador = new EventEmitter();
  public cargoSeleccionado: Cargo;
  displayedColumns = ['nombre', 'sueldo', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public message: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public length: number;
  @Input() filter: String;
  public visible: Boolean = false;
  @Input() control: Form;
  constructor(private cargoService: CargoService, private seguridadService: SeguridadService,
    private paginationService: PaginationService) { }

  ngOnInit() {

  }

  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.cargoSeleccionado = item;
      this.selection.toggle(item);
      this.filter = this.cargoSeleccionado.nombre;
      this.notificador.emit(this.cargoSeleccionado)
      this.visible = false;
    } else {
      this.cargoSeleccionado = new Cargo();
      this.visible = true;
    }
  }


  public getCargosPagination(token, pageIndex, pageSize, filter) {
    this.cargoService.cargosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = data.json().data
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }

  public search() {
    if (this.filter != '') {
      this.visible = true;
      let token = this.seguridadService.getToken()
      this.getCargosPagination(token, 1, this.paginationService.pageSize, this.filter);
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
