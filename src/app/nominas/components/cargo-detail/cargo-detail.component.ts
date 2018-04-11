import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../shared/dialog/services/dialog.service';

@Component({
  selector: 'app-cargo-detail',
  templateUrl: './cargo-detail.component.html',
  styleUrls: ['./cargo-detail.component.css']
})
export class CargoDetailComponent implements OnInit {
  @Input()
  cargo: Cargo;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cargoService: CargoService,
    private seguridadService: SeguridadService, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.cargo = new Cargo();
  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    let token = this.seguridadService.getToken()
    this.getCargo(token, id)
  }
  public onChangeComponente(value) {
    this.cargo.empresa = value;
  }
  public save() {
    let token = this.seguridadService.getToken()
    let response = this.cargoService.save(token, this.cargo);
    response.subscribe(res => {
      this.dialogService.notificacion('', res.message, this.viewContainerRef)
    })

  }
  public cancel() {
    let link = ['/' + 'cargos'];
    this.router.navigate(link);
  }
  public getCargo(token, id) {
    this.cargoService.getCargo(token, id).subscribe(res => {
      this.cargo = res.json().data;
    });
  }
}
