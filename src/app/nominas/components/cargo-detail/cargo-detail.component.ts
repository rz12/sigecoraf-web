import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cargo-detail',
  templateUrl: './cargo-detail.component.html',
  styleUrls: ['./cargo-detail.component.css']
})
export class CargoDetailComponent implements OnInit {

  public cargo: Cargo;
  public cargoForm: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cargoService: CargoService,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.cargo = new Cargo();
    this.cargoForm = this.fb.group({
      nombre: ["", Validators.required],
      sueldo: ["", Validators.required],
      descripcion: ["",],
      empresa: ["", Validators.required],
      estado: ["",],
    })
  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    if (id != 0) {
      let token = this.seguridadService.getToken()
      this.getCargo(token, id)
    }
  }
  public onChangeEmpresa(value) {
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
