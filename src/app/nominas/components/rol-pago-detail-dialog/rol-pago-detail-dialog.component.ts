import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rol-pago-detail-dialog',
  templateUrl: './rol-pago-detail-dialog.component.html',
  styleUrls: ['./rol-pago-detail-dialog.component.css']
})
export class RolPagoDetailDialogComponent implements OnInit {

  rolPagoForm: any;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<RolPagoDetailDialogComponent>, @Inject(MAT_DIALOG_DATA)
  public data: any) { }

  ngOnInit() {
    this.rolPagoForm = this.fb.group({

    })
  }
  onNoClick() {
    this.data.rolPago = null;
    this.dialogRef.close(null);
  }
  save() {

  }

}
