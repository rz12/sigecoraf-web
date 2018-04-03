import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NominasRoutingModule } from './nominas-routing.module';
import { EmpleadoDetailComponent } from './components/empleado-detail/empleado-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { CargoComponent } from './components/cargo/cargo.component';

@NgModule({
  imports: [
    CommonModule,
    NominasRoutingModule,
  ],
  declarations: [EmpleadosComponent, EmpleadoDetailComponent, CargoComponent]
})
export class NominasModule { }
