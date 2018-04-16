import { Component, OnInit, Input, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Contrato } from '../../models/contrato';
import { ContratoService } from '../../services/contrato.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CargoService } from '../../services/cargo.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-contrato-detail',
  templateUrl: './contrato-detail.component.html',
  styleUrls: ['./contrato-detail.component.css']
})
export class ContratoDetailComponent implements OnInit {

  public contrato: Contrato;
  public contratoForm: any;
  constructor(private changeDetector: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router, private contratoService: ContratoService,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService, private cargoService: CargoService, private empleadoService: EmpleadoService) {
    this.contrato = new Contrato();
    this.contratoForm = this.fb.group({
      fechaInicio: ["", Validators.required],
      fechaFin: ["",],
      cargo: ["", Validators.required],
      empleado: ["", Validators.required],
      estado: ["",],
      mensualizarDecimos: ["",],
    })
  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    if (id != 0) {
      let token = this.seguridadService.getToken()
      this.getContrato(token, id)
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
  public getContrato(token, id) {
    this.contratoService.getContrato(token, id).subscribe(res => {
      this.contrato = res.json().data;
      this.cargoService.getCargo(token, this.contrato.cargo).subscribe(cargo => {
        this.contrato.cargoObject = cargo.json().data;
      })

      this.empleadoService.getEmpleado(token, this.contrato.empleado).subscribe(empleado => {
        this.contrato.empleadoObject = empleado.json().data;
        this.changeDetector.detectChanges();
      })

    });
  }
  setCargo(event) {
    this.contrato.cargo = event.id;
  }
  setEmpleado(event) {
    this.contrato.empleado = event.id;
  }
}