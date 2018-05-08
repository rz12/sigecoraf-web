import { Component, OnInit, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Contrato } from '../../models/contrato';
import { ContratoService } from '../../services/contrato.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CargoService } from '../../services/cargo.service';
import { EmpleadoService } from '../../services/empleado.service';
import * as _moment from 'moment';
import *  as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-contrato-detail',
  templateUrl: './contrato-detail.component.html',
  styleUrls: ['./contrato-detail.component.css']
})
export class ContratoDetailComponent implements OnInit {

  public contrato: Contrato;
  public contratoForm: any;
  constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private contratoService: ContratoService,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService, private cargoService: CargoService, private empleadoService: EmpleadoService) {
    this.contrato = new Contrato();

    this.contratoForm = this.fb.group({
      fechaInicio: new FormControl(moment, Validators.required),
      fechaFin: new FormControl(moment),
      cargo: ["", Validators.required],
      empleado: ["", Validators.required],
      estado: ["",],
      mensualizarDecimos: ["",],
    })
  }

  ngOnInit() {
    let id = +this.route.snapshot.params.id;
    if (id != 0) {
      this.route.data
        .subscribe(res => {
          this.contrato = res.data.json().data;
          this.changeDetector.detectChanges();
        });
    }
  }

  public save() {
    let token = this.seguridadService.getToken()
    let response = this.contratoService.save(token, this.contrato);
    response.subscribe(res => {
      this.dialogService.notificacion('', res.message, this.viewContainerRef)
    })

  }
  public cancel() {
    let link = ['/' + 'contratos'];
    this.router.navigate(link);
  }

  setCargo(event) {
    this.contrato.cargo = event;
  }
  setEmpleado(event) {
    this.contrato.empleado = event;
  }
}