import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './componets/dialog/dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DialogService } from './services/dialog.service';
import { DialogConfirmComponent } from './componets/dialog-confirm/dialog-confirm.component';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [DialogComponent, DialogConfirmComponent],
  providers: [DialogService],
  exports: [
    DialogComponent,
  ],
  entryComponents: [DialogComponent, DialogConfirmComponent]
})
export class DialogModule { }
