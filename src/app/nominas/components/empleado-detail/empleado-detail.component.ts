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
import "rxjs/add/operator/map";

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.css']
})
export class EmpleadoDetailComponent implements OnInit {
  empleadoForm: any;
  public empleado: Empleado;
  genero: any;
  empresa: any;
  estado_civil: any;
  tipo_documento_identificacion: any;
  constructor(private route: ActivatedRoute, private router: Router, private empleadoService: EmpleadoService, private formBuilder: FormBuilder,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef,
    private dialogService: DialogService, private itemService: ItemService) {
    this.empleado = new Empleado();
    this.genero = 0
    this.estado_civil = 0
    this.tipo_documento_identificacion = 0;
    this.empresa = 0;
  }

  ngOnInit() {
    if (this.route.snapshot.params.id != 0) {
      this.route.data
        .subscribe(res => {
          this.empleado = res.empleadoData.json().data
          this.genero = res.empleadoData.json().data.genero;
          this.estado_civil = res.empleadoData.json().data.estado_civil;
          this.tipo_documento_identificacion = res.empleadoData.json().data.tipo_documento_identificacion;
          this.empresa = res.empleadoData.json().data.empresa;
        });
    }

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
  }
  public onChangeTipoDocumento(value) {
    this.empleado.tipo_documento_identificacion = value;
  }
  public onChangeGenero(value) {
    this.empleado.genero = value;
  }
  public onChangeEstadoCivil(value) {
    this.empleado.estado_civil = value;
  }
  public save() {
    let token = this.seguridadService.getToken()
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
  }
  public cancel() {
    let link = ['/' + 'empleados'];
    this.router.navigate(link);
  }
  public getEmpleado(token, id) {
    this.empleadoService.getEmpleado(token, id).subscribe(res => {
      this.empleado = res.json().data;
    });
  }

}
