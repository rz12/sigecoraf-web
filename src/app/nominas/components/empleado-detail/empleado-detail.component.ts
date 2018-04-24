import { Component, OnInit, ViewContainerRef, Inject, ChangeDetectorRef } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { enums } from '../../../credentials';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ItemService } from '../../../master/services/item.service';
import { resolve } from 'path';

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.css']
})
export class EmpleadoDetailComponent implements OnInit {
  empleadoForm: any;
  public empleado: Empleado;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private empleadoService: EmpleadoService, private formBuilder: FormBuilder,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService, private itemService: ItemService, private changeDetector: ChangeDetectorRef) {
    this.empleado = new Empleado();
  }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data: { empleado: Empleado }) => {
        this.empleado = new Empleado();
        this.empleado = data.empleado;
        console.log(this.empleado, 'por aqui')
        resolve();
      });

    this.empleadoForm = this.fb.group({
      persona: this.fb.group({
        primerNombre: ["", Validators.required],
        segundoNombre: ["",],
        primerApellido: ["", Validators.required],
        segundoApellido: ["",],
        numeroIdentificacion: ["", Validators.required],
        tipoDocumentoIdentificacion: ["", Validators.required],
        numeroCelular: ["",],
        fechaNacimiento: ["", Validators.required],
        estadoCivil: ["", Validators.required],
        genero: ["", Validators.required],
      }),
      empleado: this.fb.group({
        fechaInicio: ["", Validators.required],
        fechaFin: ["",],
        fechaIngresoIees: ["",],
        estado: ["",],
        empresa: ["", Validators.required],
      })
    });
  }
  public onChangeEmpresa(value) {
    this.empleado.empresa = value;
    this.changeDetector.detectChanges();
  }
  public onChangeTipoDocumento(value) {
    this.empleado.tipo_documento_identificacion = value;
    this.changeDetector.detectChanges();
  }
  public onChangeGenero(value) {
    this.empleado.genero = value;
    this.changeDetector.detectChanges();
  }
  public onChangeEstadoCivil(value) {
    this.empleado.estado_civil = value;
    this.changeDetector.detectChanges();
  }
  public save() {
    let token = this.seguridadService.getToken()
    this.itemService.getItem(token, this.empleado.tipo_documento_identificacion).subscribe(item => {
      this.empleado.tipo_documento_identificacion_object = item.json().data;
      this.empleadoService.save(token, this.empleado).subscribe(res => {
        let message = ""
        if (res.status == enums.HTTP_200_OK) {
          this.empleado = res.data;
          message = res.message;
        } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
          message = res.message
        }
        this.dialogService.notificacion('', message, this.viewContainerRef)
      })
    })

  }
  public cancel() {
    let link = ['/' + 'empleados'];
    this.router.navigate(link);
  }
  public getEmpleado(token, id) {
    this.empleadoService.getEmpleado(token, id).subscribe(res => {
      this.empleado = res.json().data;
      this.itemService.getItem(token, this.empleado.tipo_documento_identificacion).subscribe(item => {
        this.empleado.tipo_documento_identificacion_object = item.json().data;
      })
    });
  }

}
