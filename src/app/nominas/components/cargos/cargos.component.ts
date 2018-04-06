import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';
import { Cargo } from '../../models/cargo';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  public cargosList: Cargo[]
  constructor(private cargoService: CargoService, private seguridadService: SeguridadService) { }

  ngOnInit() {
    let token = this.seguridadService.getToken()
    this.cargoService.cargosList(token.token).subscribe(data => console.log(data))
  }

}
