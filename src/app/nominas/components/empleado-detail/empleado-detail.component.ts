import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { enums } from '../../../credentials';

@Component({
  selector: 'app-empleado-detail',
  templateUrl: './empleado-detail.component.html',
  styleUrls: ['./empleado-detail.component.css']
})
export class EmpleadoDetailComponent implements OnInit {
  submitted = false;
  onSubmit() { this.submitted = true; }
  public empleado: Empleado;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private empleadoService: EmpleadoService,
    private seguridadService: SeguridadService, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.empleado = new Empleado();
  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    if (id != 0) {
      let token = this.seguridadService.getToken()
      this.getCargo(token, id)
    }
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
