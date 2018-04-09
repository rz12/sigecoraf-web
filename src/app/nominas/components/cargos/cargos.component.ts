import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/cargo';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { MatTableDataSource } from '@angular/material';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  public cargosList: Cargo[]
  displayedColumns = ['nombre', 'sueldo'];
  dataSource = new MatTableDataSource();
  public urlEdit = "cargo-detail/0"
  public urlAdd = "cargo-detail/0"
  public message: String;
  constructor(private cargoService: CargoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    let token = this.seguridadService.getToken()
    this.cargoService.cargosList(token.token).subscribe(data => {

      if (data.json().status == enums.HTTP_200_OK) {
        this.dataSource.data = this.cargosList = data.json().data
      } else if (data.json().status == enums.HTTP_401_UNAUTHORIZED) {
        this.message = data.json().message;
      }
    });
  }

}
