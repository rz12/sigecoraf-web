import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ConsolidadoRolPago } from '../../models/consolidado-rol-pago';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsolidadoRolPagoService } from '../../services/consolidado-rol-pago.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../shared/dialog/services/dialog.service';

@Component({
  selector: 'app-consolidado-rol-pago-detail',
  templateUrl: './consolidado-rol-pago-detail.component.html',
  styleUrls: ['./consolidado-rol-pago-detail.component.css']
})
export class ConsolidadoRolPagoDetailComponent implements OnInit {
  public consolidadoRolPago: ConsolidadoRolPago;
  public consolidadoRolPagoForm: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private consolidadoRolPagoService: ConsolidadoRolPagoService,
    private seguridadService: SeguridadService, private fb: FormBuilder, private viewContainerRef: ViewContainerRef, private dialogService: DialogService) {
    this.consolidadoRolPago = new ConsolidadoRolPago();
    this.consolidadoRolPagoForm = this.fb.group({
      fechaDesde: ["", Validators.required],
      fechaHasta: ["", Validators.required],
      observacion: ["", Validators.required],
      estado: ["",],
    })
  }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    if (id != 0) {
      let token = this.seguridadService.getToken()
      this.getConsolidadoRolPago(token, id)
    }
  }

  public save() {
    let token = this.seguridadService.getToken()
    let response = this.consolidadoRolPagoService.save(token, this.consolidadoRolPago);
    response.subscribe(res => {
      this.dialogService.notificacion('', res.message, this.viewContainerRef)
    })

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
