import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { MatSidenavModule, MatIconModule, MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatMenuModule, MatTabsModule, MatLineModule, MatToolbarModule, MatDividerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatLineModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    FlexLayoutModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatDividerModule,

  ],
  declarations: [InicioComponent,],
  providers: [],
  entryComponents: [InicioComponent],
})
export class HomeModule { }
