import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ConsolidadoRolPago } from '../../models/consolidado-rol-pago';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsolidadoRolPagoService } from '../../services/consolidado-rol-pago.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import *  as _rollupMoment from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-consolidado-rol-pago-detail',
  templateUrl: './consolidado-rol-pago-detail.component.html',
  styleUrls: ['./consolidado-rol-pago-detail.component.css'],
})
export class ConsolidadoRolPagoDetailComponent implements OnInit {
  public consolidadoRolPago: ConsolidadoRolPago;
  public consolidadoRolPagoForm: any;
  isLinear = true;
  public validado: Boolean = false
  constructor(private route: ActivatedRoute, private router: Router, private consolidadoRolPagoService: ConsolidadoRolPagoService,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.consolidadoRolPago = new ConsolidadoRolPago();
    this.consolidadoRolPagoForm = this.fb.group({
      fechaDesde: new FormControl(moment, Validators.required),
      fechaHasta: new FormControl(moment, Validators.required),
      observacion: ["", Validators.required],
      estado: ["",],
      validado: ["",],
    })
  }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    if (id != 0) {
      this.route.data
        .subscribe(res => {
          this.consolidadoRolPago = res.data.json().data;
          this.validado = this.consolidadoRolPago.validado;
        });
    }
  }

  public save() {
    let token = this.seguridadService.getToken()
    let response = this.consolidadoRolPagoService.save(token, this.consolidadoRolPago);
    response.subscribe(res => {
      this.consolidadoRolPago = res.data;
      this.dialogService.notificacion('', res.message, this.viewContainerRef)
    })
  }
  public confirmSave() {
    this.dialogService.confirm('Finalizar Consolidado Rol Pago', '¿Seguro desea finalizar el Consolidado de Rol de Pago?', this.viewContainerRef)
      .subscribe(res => {
        if (res == true) {
          this.save();
          let link = ['/' + 'consolidado-rolpago'];
          this.router.navigate(link);
        }
      });
  }
  public cancel() {
    let link = ['/' + 'consolidado-rolpago'];
    this.router.navigate(link);
  }
  public getConsolidadoRolPago(token, id) {
    this.consolidadoRolPagoService.getConsolidadoRolPago(token, id).subscribe(res => {
      this.consolidadoRolPago = res.json().data;
    });
  }

}
