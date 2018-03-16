import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './componets/dialog/dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DialogService } from './services/dialog.service';
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [DialogComponent],
  providers: [DialogService],
  exports: [
    DialogComponent,
  ],
  entryComponents: [DialogComponent]
})
export class DialogModule { }
