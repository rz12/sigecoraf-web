import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DialogComponent } from './componets/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [DialogComponent]
})
export class SharedModule { }
