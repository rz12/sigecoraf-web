import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from '../componets/dialog/dialog.component';
import { DialogConfirmComponent } from '../componets/dialog-confirm/dialog-confirm.component';
@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }
  public notificacion(title: string, message: string, viewContainerRef: ViewContainerRef = null): Observable<boolean> {
    let dialogConfig = this.getConfigDialog(viewContainerRef);
    let dialogRef = this.getDialog(dialogConfig, DialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }
  public getDialog(mdDialogConfig, dialogComponent) {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(dialogComponent, mdDialogConfig);
    return dialogRef
  }
  public getConfigDialog(viewContainerRef: ViewContainerRef) {
    let config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    config.disableClose = true;
  }
  public confirm(title: string, message: string, viewContainerRef: ViewContainerRef = null): Observable<boolean> {
    let dialogConfig = this.getConfigDialog(viewContainerRef);
    let dialogRef = this.getDialog(dialogConfig, DialogConfirmComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    return dialogRef.afterClosed();
  }
}
