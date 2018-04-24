import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>) { }

  ngOnInit() {
  }
}
