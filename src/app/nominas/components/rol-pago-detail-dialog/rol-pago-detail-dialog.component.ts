import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolPagoService } from '../../services/rol-pago.service';
import { DialogService } from '../../../shared/dialog/services/dialog.service';
import { SeguridadService } from '../../../seguridad/services/seguridad.service';

@Component({
  selector: 'app-rol-pago-detail-dialog',
  templateUrl: './rol-pago-detail-dialog.component.html',
  styleUrls: ['./rol-pago-detail-dialog.component.css']
})
export class RolPagoDetailDialogComponent implements OnInit {

  rolPagoForm: any;
  constructor(private fb: FormBuilder, private rolPagoService: RolPagoService, private dialogService: DialogService, private seguridadService: SeguridadService,
    private viewContainerRef: ViewContainerRef, public dialogRef: MatDialogRef<RolPagoDetailDialogComponent>, @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit() {
    console.log(this.data.rolPago)
    this.rolPagoForm = this.fb.group({

    })
  }
  onNoClick() {
    this.dialogRef.close();
  }
  save() {
    this.confirmGenerarRolesPago();

  }
  public updateRolPago() {
    let token = this.seguridadService.getToken();
    this.rolPagoService.updateWithDetalles(this.data.rolPago, token).subscribe(res => {
      this.data.rolPago = res.data;
      this.dialogRef.close(this.data.rolPago);
    })

  }
  public confirmGenerarRolesPago() {
    this.dialogService.confirm('Actualizar el Rol de Pago', '¿Seguro desea actualizar el Role de Pago?', this.viewContainerRef)
      .subscribe(res => {
        if (res == true) {
          this.updateRolPago();
        }
      });
  }
  public generarReporteRolPago() {
    let token = this.seguridadService.getToken();
    this.rolPagoService.generarReporte(this.data.rolPago, token)

  }
}
