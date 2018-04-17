import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Direccion } from '../../models/direccion';

@Component({
  selector: 'app-direccion-detail-dialog',
  templateUrl: './direccion-detail-dialog.component.html',
  styleUrls: ['./direccion-detail-dialog.component.css']
})
export class DireccionDetailDialogComponent implements OnInit {

  direccionForm: any;
  constructor(private changeDetector: ChangeDetectorRef, private fb: FormBuilder, public dialogRef: MatDialogRef<DireccionDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.direccionForm = this.fb.group({
      ciudad: ["", Validators.required],
      pais: ["", Validators.required],
      tipoDireccion: ["", Validators.required],
      callePrincipal: ["", Validators.required],
      calleSecundaria: ["",],
      referencia: ["",],
      numeroTelefono: ["",]
    })
  }
  onNoClick() {
    this.dialogRef.close(null);
  }
  save() {
    this.data.direccion.pais = this.direccionForm.controls.pais.value
    this.data.direccion.tipo_direccion = this.direccionForm.controls.tipoDireccion.value
    this.dialogRef.close(this.data.direccion);
  }

}
