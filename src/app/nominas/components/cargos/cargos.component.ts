import { Component, OnInit, ViewChild } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/cargo';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { enums } from '../../../credentials';
import { Parametrizacion } from '../../../master/models/parametrizacion';
import { ParametrizacionService } from '../../../master/services/parametrizacion.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginationService } from '../../../shared/services/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  public cargosList: Cargo[];
  displayedColumns = ['nombre', 'sueldo', 'seleccionar'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel();
  public urlEdit: String;
  public urlAdd = "cargo-detail/0"
  public codigoAddCargo = "ADD_CARGO";
  public codigoEditCargo = "EDIT_CARGO";
  public message: String;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public length: number;
  public filter: String;
  constructor(private route: ActivatedRoute, private paginationService: PaginationService, private cargoService: CargoService, private seguridadService: SeguridadService,
    private parametrizacionService: ParametrizacionService) { }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.dataSource.data = res.data.json().data
      this.length = res.data.json().count
    })
  }
  public loadPagination(event) {
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, Number(event.pageIndex) + 1, event.pageSize, this.filter);
  }
  selectedRow(item, event) {
    if (event.checked) {
      this.urlEdit = 'cargo-detail'
      this.urlEdit = this.urlEdit.concat('/').concat(item.id)
      this.selection.toggle(item);
    } else {
      this.urlEdit = null;
    }
  }
  public getCargosPagination(token, pageIndex, pageSize, filter) {
    this.cargoService.cargosList(token.token, pageIndex, pageSize, filter).subscribe(data => {
      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.cargosList = data.json().data
        this.length = data.json().count;
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }

  public search(event) {
    this.filter = event;
    let token = this.seguridadService.getToken()
    this.getCargosPagination(token, 1, this.paginationService.pageSize, this.filter);
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
