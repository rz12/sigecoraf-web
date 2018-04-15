import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { enums } from '../../../credentials';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.css']
})
export class EmpleadoDetailComponent implements OnInit {
  empleadoForm: any;
  public empleado: Empleado;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private empleadoService: EmpleadoService, private formBuilder: FormBuilder,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.empleado = new Empleado();

  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    if (id != 0) {
      let token = this.seguridadService.getToken()
      this.getCargo(token, id)
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
    let response = this.empleadoService.save(token, this.empleado);
    response.subscribe(res => {
      let message = ""
      if (res.status == enums.HTTP_200_OK) {
        message = res.message;
      } else if (res.status == enums.HTTP_400_BAD_REQUEST) {
        message = 'Campos Obligatorios Vacíos.'
      }
      this.dialogService.notificacion('', message, this.viewContainerRef)
    })
  }
  public cancel() {
    let link = ['/' + 'empleados'];
    this.router.navigate(link);
  }
  public getCargo(token, id) {
    this.empleadoService.getEmpleado(token, id).subscribe(res => {
      this.empleado = res.json().data;
    });
  }

}
