import { Component, OnInit } from '@angular/core';
import { Cargo } from '../../models/cargo';

@Component({
  selector: 'app-cargo-detail',
  templateUrl: './cargo-detail.component.html',
  styleUrls: ['./cargo-detail.component.css']
})
export class CargoDetailComponent implements OnInit {
  public cargo: Cargo;
  constructor() {
    this.cargo = new Cargo();
  }

  ngOnInit() {
  }

}
