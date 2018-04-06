import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  constructor(private cargoService: CargoService) { }

  ngOnInit() {
    this.cargoService.cargosList('aa').subscribe(data => console.log(data))
  }

}
