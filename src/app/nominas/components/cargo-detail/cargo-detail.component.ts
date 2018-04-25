import { Component, OnInit, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
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
  public empresa: any;
  constructor(private route: ActivatedRoute, private router: Router, private cargoService: CargoService,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService, private changeDetector: ChangeDetectorRef) {
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
    let id = +this.route.snapshot.params.id;
    if (id != 0) {
      this.route.data
        .subscribe(res => {
          this.cargo = res.cargoData.json().data;
          this.empresa = res.cargoData.json().data.empresa;

        });
    }
  }
  public onChangeEmpresa(value) {
    this.cargo.empresa = value;
    this.changeDetector.detectChanges();
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
